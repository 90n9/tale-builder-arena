export interface Achievement {
  id: string;
  name: string;
  description: string;
  genre: string;
  endSceneType: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export const ALL_ACHIEVEMENTS: Achievement[] = [
  // High Fantasy
  { id: "hf_1", name: "The Dragon Slayer", description: "สังหารมังกรโบราณด้วยตัวคนเดียว", genre: "High Fantasy", endSceneType: "dragon_victory", rarity: "legendary" },
  { id: "hf_2", name: "Master of Magic", description: "ปลดผนึกคาถาต้องห้ามของหอเวท", genre: "High Fantasy", endSceneType: "magic_mastery", rarity: "epic" },
  { id: "hf_3", name: "Kingdom Savior", description: "กอบกู้ดินแดนจากการรุกรานของจอมมาร", genre: "High Fantasy", endSceneType: "kingdom_saved", rarity: "rare" },
  { id: "hf_4", name: "Lost Artifact", description: "ค้นพบดาบในตำนานอายุพันปี", genre: "High Fantasy", endSceneType: "artifact_found", rarity: "epic" },
  
  // Dark Fantasy
  { id: "df_1", name: "Curse Breaker", description: "ปลดคำสาปเก่าแก่จากแผ่นดินต้องสาป", genre: "Dark Fantasy", endSceneType: "curse_broken", rarity: "epic" },
  { id: "df_2", name: "Shadow Walker", description: "โอบรับความมืดและกลายเป็นหนึ่งกับเงา", genre: "Dark Fantasy", endSceneType: "shadow_embrace", rarity: "legendary" },
  { id: "df_3", name: "Blood Pact", description: "ต่อรองกับอสูรและรอดชีวิตมาได้", genre: "Dark Fantasy", endSceneType: "demon_pact", rarity: "rare" },
  { id: "df_4", name: "Undead Hunter", description: "กวาดล้างนครคนตายจากฝูงอันเดธ", genre: "Dark Fantasy", endSceneType: "undead_purge", rarity: "common" },
  
  // Sci-Fi
  { id: "sf_1", name: "First Contact", description: "เจรจาสันติภาพกับอารยธรรมต่างดาวสำเร็จ", genre: "Sci-Fi", endSceneType: "alien_peace", rarity: "rare" },
  { id: "sf_2", name: "AI Awakening", description: "ช่วย AI ให้ตื่นรู้มีจิตสำนึกจริง", genre: "Sci-Fi", endSceneType: "ai_consciousness", rarity: "legendary" },
  { id: "sf_3", name: "Space Explorer", description: "ค้นพบดาวเคราะห์ใหม่ที่อยู่อาศัยได้", genre: "Sci-Fi", endSceneType: "planet_discovery", rarity: "epic" },
  { id: "sf_4", name: "Time Paradox", description: "เอาชีวิตรอดจากความผิดปกติเวลาและซ่อมเส้นเวลา", genre: "Sci-Fi", endSceneType: "time_fixed", rarity: "legendary" },
  
  // Cyberpunk
  { id: "cp_1", name: "Corporate Takedown", description: "เปิดโปงความลับดำมืดของบริษัทยักษ์", genre: "Cyberpunk", endSceneType: "corp_exposed", rarity: "epic" },
  { id: "cp_2", name: "Neural Ghost", description: "กลายเป็นตำนานในโลกดิจิทัล", genre: "Cyberpunk", endSceneType: "digital_legend", rarity: "rare" },
  { id: "cp_3", name: "Street Samurai", description: "รอดศึกแก๊งและรวมถนนเข้าด้วยกัน", genre: "Cyberpunk", endSceneType: "streets_united", rarity: "common" },
  { id: "cp_4", name: "System Breach", description: "แฮ็กเมนเฟรมของเมืองสำเร็จ", genre: "Cyberpunk", endSceneType: "mainframe_hacked", rarity: "epic" },
  
  // Horror
  { id: "hr_1", name: "Final Survivor", description: "หนีจากฝันร้ายโดยยังคงสติครบถ้วน", genre: "Horror", endSceneType: "escaped_sane", rarity: "legendary" },
  { id: "hr_2", name: "Witness", description: "เห็นความจริงหลังม่านลี้ลับและเอาชีวิตรอด", genre: "Horror", endSceneType: "truth_witnessed", rarity: "epic" },
  { id: "hr_3", name: "Banished Evil", description: "ประกอบพิธีผนึกสิ่งชั่วร้ายสำเร็จ", genre: "Horror", endSceneType: "entity_sealed", rarity: "rare" },
  { id: "hr_4", name: "Lost Innocence", description: "เผชิญหน้าความกลัวลึกสุดใจ", genre: "Horror", endSceneType: "fears_faced", rarity: "common" },
  
  // Post-Apocalyptic
  { id: "pa_1", name: "Wasteland Legend", description: "ตั้งถิ่นฐานรุ่งเรืองท่ามกลางซากปรักหักพัง", genre: "Post-Apocalyptic", endSceneType: "settlement_built", rarity: "legendary" },
  { id: "pa_2", name: "Vault Dweller", description: "เปิดเผยความลับของหลุมหลบภัย 13", genre: "Post-Apocalyptic", endSceneType: "vault_secrets", rarity: "epic" },
  { id: "pa_3", name: "Raider King", description: "รวมชนเผ่าแห่งทะเลทรายร้างภายใต้ธงของคุณ", genre: "Post-Apocalyptic", endSceneType: "tribes_united", rarity: "rare" },
  { id: "pa_4", name: "Last Hope", description: "ค้นพบยารักษาที่ช่วยมนุษยชาติ", genre: "Post-Apocalyptic", endSceneType: "cure_found", rarity: "legendary" },
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
