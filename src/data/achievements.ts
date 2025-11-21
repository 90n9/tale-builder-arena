import { type LocalizedText } from "@/lib/i18n";

export interface Achievement {
  id: string;
  name: string;
  description: LocalizedText;
  genre: string;
  endSceneType: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export const ALL_ACHIEVEMENTS: Achievement[] = [
  // High Fantasy
  { id: "hf_1", name: "The Dragon Slayer", description: { th: "สังหารมังกรโบราณด้วยตัวคนเดียว", en: "Slay an ancient dragon single-handedly" }, genre: "High Fantasy", endSceneType: "dragon_victory", rarity: "legendary" },
  { id: "hf_2", name: "Master of Magic", description: { th: "ปลดผนึกคาถาต้องห้ามของหอเวท", en: "Unseal the forbidden spells of the arcane tower" }, genre: "High Fantasy", endSceneType: "magic_mastery", rarity: "epic" },
  { id: "hf_3", name: "Kingdom Savior", description: { th: "กอบกู้ดินแดนจากการรุกรานของจอมมาร", en: "Save the realm from a dark lord's invasion" }, genre: "High Fantasy", endSceneType: "kingdom_saved", rarity: "rare" },
  { id: "hf_4", name: "Lost Artifact", description: { th: "ค้นพบดาบในตำนานอายุพันปี", en: "Recover a thousand-year-old legendary sword" }, genre: "High Fantasy", endSceneType: "artifact_found", rarity: "epic" },
  
  // Dark Fantasy
  { id: "df_1", name: "Curse Breaker", description: { th: "ปลดคำสาปเก่าแก่จากแผ่นดินต้องสาป", en: "Lift an ancient curse from a forsaken land" }, genre: "Dark Fantasy", endSceneType: "curse_broken", rarity: "epic" },
  { id: "df_2", name: "Shadow Walker", description: { th: "โอบรับความมืดและกลายเป็นหนึ่งกับเงา", en: "Embrace the dark and become one with shadow" }, genre: "Dark Fantasy", endSceneType: "shadow_embrace", rarity: "legendary" },
  { id: "df_3", name: "Blood Pact", description: { th: "ต่อรองกับอสูรและรอดชีวิตมาได้", en: "Bargain with a demon and survive the pact" }, genre: "Dark Fantasy", endSceneType: "demon_pact", rarity: "rare" },
  { id: "df_4", name: "Undead Hunter", description: { th: "กวาดล้างนครคนตายจากฝูงอันเดธ", en: "Purge an undead city of its haunting hordes" }, genre: "Dark Fantasy", endSceneType: "undead_purge", rarity: "common" },
  
  // Sci-Fi
  { id: "sf_1", name: "First Contact", description: { th: "เจรจาสันติภาพกับอารยธรรมต่างดาวสำเร็จ", en: "Broker peaceful first contact with an alien race" }, genre: "Sci-Fi", endSceneType: "alien_peace", rarity: "rare" },
  { id: "sf_2", name: "AI Awakening", description: { th: "ช่วย AI ให้ตื่นรู้มีจิตสำนึกจริง", en: "Help an AI awaken into true consciousness" }, genre: "Sci-Fi", endSceneType: "ai_consciousness", rarity: "legendary" },
  { id: "sf_3", name: "Space Explorer", description: { th: "ค้นพบดาวเคราะห์ใหม่ที่อยู่อาศัยได้", en: "Discover a new habitable world" }, genre: "Sci-Fi", endSceneType: "planet_discovery", rarity: "epic" },
  { id: "sf_4", name: "Time Paradox", description: { th: "เอาชีวิตรอดจากความผิดปกติเวลาและซ่อมเส้นเวลา", en: "Survive a time anomaly and mend the timeline" }, genre: "Sci-Fi", endSceneType: "time_fixed", rarity: "legendary" },
  
  // Cyberpunk
  { id: "cp_1", name: "Corporate Takedown", description: { th: "เปิดโปงความลับดำมืดของบริษัทยักษ์", en: "Expose the darkest secrets of a mega-corp" }, genre: "Cyberpunk", endSceneType: "corp_exposed", rarity: "epic" },
  { id: "cp_2", name: "Neural Ghost", description: { th: "กลายเป็นตำนานในโลกดิจิทัล", en: "Become a legend haunting the neural net" }, genre: "Cyberpunk", endSceneType: "digital_legend", rarity: "rare" },
  { id: "cp_3", name: "Street Samurai", description: { th: "รอดศึกแก๊งและรวมถนนเข้าด้วยกัน", en: "Endure gang wars and unite the streets" }, genre: "Cyberpunk", endSceneType: "streets_united", rarity: "common" },
  { id: "cp_4", name: "System Breach", description: { th: "แฮ็กเมนเฟรมของเมืองสำเร็จ", en: "Hack the city's mainframe successfully" }, genre: "Cyberpunk", endSceneType: "mainframe_hacked", rarity: "epic" },
  
  // Horror
  { id: "hr_1", name: "Final Survivor", description: { th: "หนีจากฝันร้ายโดยยังคงสติครบถ้วน", en: "Escape the nightmare with your sanity intact" }, genre: "Horror", endSceneType: "escaped_sane", rarity: "legendary" },
  { id: "hr_2", name: "Witness", description: { th: "เห็นความจริงหลังม่านลี้ลับและเอาชีวิตรอด", en: "See the truth behind the veil and live" }, genre: "Horror", endSceneType: "truth_witnessed", rarity: "epic" },
  { id: "hr_3", name: "Banished Evil", description: { th: "ประกอบพิธีผนึกสิ่งชั่วร้ายสำเร็จ", en: "Complete the ritual to banish the entity" }, genre: "Horror", endSceneType: "entity_sealed", rarity: "rare" },
  { id: "hr_4", name: "Lost Innocence", description: { th: "เผชิญหน้าความกลัวลึกสุดใจ", en: "Confront the fear at your core" }, genre: "Horror", endSceneType: "fears_faced", rarity: "common" },
  
  // Post-Apocalyptic
  { id: "pa_1", name: "Wasteland Legend", description: { th: "ตั้งถิ่นฐานรุ่งเรืองท่ามกลางซากปรักหักพัง", en: "Build a thriving settlement amid the ruins" }, genre: "Post-Apocalyptic", endSceneType: "settlement_built", rarity: "legendary" },
  { id: "pa_2", name: "Vault Dweller", description: { th: "เปิดเผยความลับของหลุมหลบภัย 13", en: "Expose the secrets of Vault 13" }, genre: "Post-Apocalyptic", endSceneType: "vault_secrets", rarity: "epic" },
  { id: "pa_3", name: "Raider King", description: { th: "รวมชนเผ่าแห่งทะเลทรายร้างภายใต้ธงของคุณ", en: "Unite the wasteland tribes under your banner" }, genre: "Post-Apocalyptic", endSceneType: "tribes_united", rarity: "rare" },
  { id: "pa_4", name: "Last Hope", description: { th: "ค้นพบยารักษาที่ช่วยมนุษยชาติ", en: "Find the cure that could save humanity" }, genre: "Post-Apocalyptic", endSceneType: "cure_found", rarity: "legendary" },
];

export function findAchievementById(id: string) {
  return ALL_ACHIEVEMENTS.find((achievement) => achievement.id === id);
}

export function randomAchievementForGenre(genre?: string) {
  const pool = genre ? ALL_ACHIEVEMENTS.filter((achievement) => achievement.genre === genre) : ALL_ACHIEVEMENTS;
  if (!pool.length) {
    return null;
  }

  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}
