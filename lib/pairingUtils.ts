import { Member, TalentType, TALENT_ORDER, GOLDEN_TRIANGLES } from '@/types';

// 獲取黃金三角中的所有天賦
export function getGoldenTriangleMembers(
  talent: TalentType,
): TalentType[] {
  return GOLDEN_TRIANGLES[talent] || [];
}

// 檢查兩個天賦是否在同一黃金三角
export function isGoldenTrianglePair(
  talent1: TalentType,
  talent2: TalentType,
): boolean {
  const triangle1 = GOLDEN_TRIANGLES[talent1];
  const triangle2 = GOLDEN_TRIANGLES[talent2];

  if (!triangle1 || !triangle2) return false;

  return triangle1.includes(talent2) || triangle2.includes(talent1);
}

// 檢查是否為相似天賦（同象限或相同）
export function isSimilarTalent(talent1: TalentType, talent2: TalentType): boolean {
  if (talent1 === talent2) return true;

  // 同象限配對
  const quadrants: Record<string, TalentType[]> = {
    innovation: ['creator', 'mechanic'],
    multiplication: ['lord', 'accumulator'],
    timing: ['trader', 'dealmaker'],
    expansion: ['supporter', 'star'],
  };

  for (const members of Object.values(quadrants)) {
    if (members.includes(talent1) && members.includes(talent2)) {
      return true;
    }
  }

  return false;
}

// 獲取配對關係類型
export function getPairingRelationType(
  talent1: TalentType,
  talent2: TalentType,
  occupation1?: string,
  occupation2?: string,
): 'golden_triangle' | 'similar_talent' | 'same_occupation' | 'none' {
  if (isGoldenTrianglePair(talent1, talent2)) {
    return 'golden_triangle';
  }

  if (isSimilarTalent(talent1, talent2)) {
    return 'similar_talent';
  }

  if (occupation1 && occupation2 && occupation1 === occupation2) {
    return 'same_occupation';
  }

  return 'none';
}

// 計算配對評分（用於排序）
export function calculatePairingScore(
  relationType: 'golden_triangle' | 'similar_talent' | 'same_occupation' | 'none',
  isTrainingPair: boolean,
): number {
  let score = 0;

  // 優先級3的三項（平等考慮）
  switch (relationType) {
    case 'golden_triangle':
      score += 100;
      break;
    case 'similar_talent':
      score += 100;
      break;
    case 'same_occupation':
      score += 100;
      break;
    default:
      score += 0;
  }

  // 優先級2：複訓配初訓
  if (isTrainingPair) {
    score += 200;
  }

  return score;
}

// 檢查配對是否已存在於歷史中
export function hasBeenPaired(
  member1Id: string,
  member2Id: string,
  pairingHistory: Array<{ member1_id: string; member2_id: string }>,
): boolean {
  return pairingHistory.some(
    (p) =>
      (p.member1_id === member1Id && p.member2_id === member2Id) ||
      (p.member1_id === member2Id && p.member2_id === member1Id),
  );
}

// 自動配對演算法
export function generateAutoPairings(
  members: Member[],
  pairingHistory: Array<{ member1_id: string; member2_id: string }>,
): Array<[Member, Member]> {
  const pairings: Array<[Member, Member]> = [];
  const used = new Set<string>();

  // 分組：複訓生和初訓生
  const experienced = members.filter((m) => !m.is_training);
  const training = members.filter((m) => m.is_training);

  // 優先級1：避免重複
  // 優先級2：複訓配初訓
  for (const trainee of training) {
    if (used.has(trainee.id)) continue;

    // 尋找未配對過的複訓生
    let bestExp: Member | null = null;
    let bestScore = -1;

    for (const exp of experienced) {
      if (used.has(exp.id)) continue;
      if (hasBeenPaired(exp.id, trainee.id, pairingHistory)) continue;

      const relationType = getPairingRelationType(
        exp.talent,
        trainee.talent,
        exp.occupation,
        trainee.occupation,
      );

      const score = calculatePairingScore(relationType, true);

      if (score > bestScore) {
        bestScore = score;
        bestExp = exp;
      }
    }

    if (bestExp) {
      pairings.push([bestExp, trainee]);
      used.add(trainee.id);
      used.add(bestExp.id);
    }
  }

  // 處理剩餘的初訓生（與初訓生配對）或複訓生
  const remaining = members.filter((m) => !used.has(m.id));

  for (let i = 0; i < remaining.length - 1; i += 2) {
    if (!used.has(remaining[i].id) && !used.has(remaining[i + 1].id)) {
      if (!hasBeenPaired(remaining[i].id, remaining[i + 1].id, pairingHistory)) {
        pairings.push([remaining[i], remaining[i + 1]]);
        used.add(remaining[i].id);
        used.add(remaining[i + 1].id);
      }
    }
  }

  return pairings;
}
