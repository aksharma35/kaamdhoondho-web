/** The 10 launch skill categories. Labels live in i18n under landing.categories.<key>. */
export const SKILL_CATEGORIES = [
  { emoji: '🔨', key: 'carpenter' },
  { emoji: '🧹', key: 'houseHelp' },
  { emoji: '🚗', key: 'driver' },
  { emoji: '🍳', key: 'cook' },
  { emoji: '💡', key: 'electrician' },
  { emoji: '🛡️', key: 'securityGuard' },
  { emoji: '🌱', key: 'gardener' },
  { emoji: '🏋️', key: 'coach' },
  { emoji: '🔧', key: 'plumber' },
  { emoji: '🎨', key: 'painter' },
] as const;

export type SkillKey = (typeof SKILL_CATEGORIES)[number]['key'];
