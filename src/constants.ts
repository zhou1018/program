/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MedicineInfo {
  id: string;
  name: string;
  status: string;
  duration: string;
  endorsement: string;
  practicalTips: string;
}

export const MEDICINE_GUIDE: MedicineInfo[] = [
  {
    id: 'm1',
    name: '内舒拿 (糠酸莫米松)',
    status: '一线首选 (INS)',
    duration: '建议 4 周以上',
    endorsement: '局部吸收率 <0.1%，不影响生长发育',
    practicalTips: '喷雾要向外侧（斜向耳朵方向）倾斜，避开鼻中隔以免出血。早晚固定时间使用效果更佳。',
  },
  {
    id: 'm2',
    name: '辅舒良 (丙酸氟替卡松)',
    status: '一线首选 (INS)',
    duration: '建议 2-4 周',
    endorsement: '世界范围内长期临床验证，安全性高',
    practicalTips: '适合 4 岁以上孩子。注意如果是绿喷（丙酸），口感可能略微刺鼻。',
  },
  {
    id: 'm3',
    name: '开瑞坦/仙特明 (抗组胺药)',
    status: '一线推荐',
    duration: '按需或 2 周疗程',
    endorsement: '二代抗组胺，无中枢抑制（不嗜睡）',
    practicalTips: '糖浆口感好，孩子接受度高。通常用于缓解流清涕和揉眼睛。',
  },
  {
    id: 'm4',
    name: '顺尔宁 (孟鲁司特钠)',
    status: '针对特定类型',
    duration: '4 周以上',
    endorsement: '非激素类抗炎药',
    practicalTips: '咀嚼片像糖果，睡前服用。注意观察孩子是否有烦躁或噩梦等情绪波动。',
  },
];

export const NOSE_WASH_STEPS = [
  {
    id: 0,
    title: '家长定心丸',
    desc: '在开始前，请给自己 30 秒。你的平静是给宝宝最好的安慰。',
    pitfall: '如果你感到心慌，宝宝会感应到你的焦虑从而更加抗拒。记住，这只是为了让他呼吸更顺畅，你做得很棒。',
  },
  {
    id: 1,
    title: '温控 (37℃)',
    desc: '水温接近体温。',
    pitfall: '千万不要用冷水或过热的水，会刺激纤毛甚至引起呛咳感。',
  },
  {
    id: 2,
    title: '溶解 (完全)',
    desc: '洗鼻盐需充分溶解。',
    pitfall: '未溶解的盐粒会摩擦鼻黏膜，产生强烈痛感。',
  },
  {
    id: 3,
    title: '姿势 (微歪)',
    desc: '向出水侧微歪，张口呼吸。',
    pitfall: '低头太深或抬头太高都会导致洗鼻液流进中耳。',
  },
  {
    id: 4,
    title: '挤压 (温柔)',
    desc: '缓慢挤压瓶身，温柔沟通。',
    pitfall: '暴发式挤压会瞬间产生高压，是引发中耳炎的主因。',
  },
  {
    id: 5,
    title: '擤鼻 (单侧)',
    desc: '按住单侧，轻轻擤出余液。',
    pitfall: '严禁双侧一起用力擤，压力会直冲耳管。',
  },
];

export const SYMPTOMS_OPTIONS = [
  { id: 'sneezing', label: '打喷嚏' },
  { id: 'runny_nose', label: '流鼻涕' },
  { id: 'itchy_eye', label: '揉眼睛' },
  { id: 'day_cough', label: '日间咳嗽' },
  { id: 'night_cough', label: '夜间咳嗽' },
  { id: 'sniffing', label: '吸鼻子' },
  { id: 'clearing_throat', label: '清嗓子' },
];

export const MYTHS = [
  {
    q: '“激素喷雾会影响孩子长高。”',
    a: '2022年指南明确指出，内舒拿等二代激素局部吸收率极低，长达一年的研究证实对发育无显著影响。',
  },
  {
    q: '“洗鼻会洗出中耳炎。”',
    a: '只要姿势正确（不憋气、不吞咽、不暴力按压），洗鼻是医生最推荐的物理疗法。',
  },
];

export const TRAFFIC_LIGHTS = [
  {
    level: 'Green',
    title: '绿色 (淡定区)',
    color: 'bg-green-500',
    icon: 'smile',
    indicator: '偶尔打喷嚏、流清涕，精神头足，吃饭睡觉照常。',
    action: '维持基础护理（洗鼻、环境除尘），保持心态平和。',
    feedback: '今日宝宝呼吸很‘顺滑’！目前的护理方案非常有效。继续保持室温 24-26℃，湿度 50%-60%，胜利就在前方。',
  },
  {
    level: 'Yellow',
    title: '黄色 (预警区)',
    color: 'bg-yellow-500',
    icon: 'alert',
    indicator: '脓涕超过10天，开始频繁揉眼、揉鼻子，夜间轻微咳嗽。',
    action: '规范化用药（按指南足疗程），密切观察病情波动。',
    feedback: '注意喽，小鼻子今天有点‘闹脾气’。建议：复核洗鼻姿势，严格按指南足疗程用药。若波动持续 3 天以上，建议咨询医生。',
  },
  {
    level: 'Red',
    title: '红色 (急诊区)',
    color: 'bg-red-600',
    icon: 'alarm',
    indicator: '持续高烧、眼睑红肿、嗅觉丧失、呼吸费力。',
    action: '不要等待，立即前往耳鼻喉科急诊！',
    feedback: '预警：发现高风险信号！ 监测到发烧/眼肿等指征，请不要等待，建议立即前往耳鼻喉科急诊。安全永远是第一位的。',
  },
];

export const HEALING_MESSAGES = [
  "别自责，你已经是宝宝心中最棒的守护者了。",
  "免疫系统正在升级，我们陪他慢慢来。",
  "熬过这段成长期，春天总会来的。",
  "深呼吸感应：你和宝宝都做得很棒。",
  "每一次洗鼻，都是在为他的呼吸森林清理积雪。",
  "不仅是他在长大，你也在陪他一起变强。",
];
