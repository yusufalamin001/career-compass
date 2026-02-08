import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { RIASECScores, RIASECType } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const RIASEC_COLORS: Record<RIASECType, string> = {
  R: '#3B82F6',
  I: '#6366F1',
  A: '#A855F7',
  S: '#2DD4BF',
  E: '#F97316',
  C: '#22C55E',
};

export const RIASEC_LABELS: Record<RIASECType, string> = {
  R: 'Realistic',
  I: 'Investigative',
  A: 'Artistic',
  S: 'Social',
  E: 'Enterprising',
  C: 'Conventional',
};

export const RIASEC_DESCRIPTIONS: Record<RIASECType, string> = {
  R: 'Prefers hands-on work with tools, machines, and physical activities',
  I: 'Enjoys solving complex problems through research and analysis',
  A: 'Values creativity, self-expression, and artistic endeavors',
  S: 'Prefers helping, teaching, and working with people',
  E: 'Enjoys leading, persuading, and business ventures',  C: 'Prefers organized, structured work with clear procedures',
};

export function calculateDominantTypes(scores: RIASECScores): RIASECType[] {
  const sortedTypes = (Object.keys(scores) as RIASECType[])
    .sort((a, b) => scores[b] - scores[a]);
  
  return sortedTypes.slice(0, 3);
}

export function formatSalary(min: number, max: number): string {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  return `${formatNumber(min)} - ${formatNumber(max)}`;
}