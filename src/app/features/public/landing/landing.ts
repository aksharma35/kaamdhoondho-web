import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Category {
  emoji: string;
  en: string;
  hi: string;
}

@Component({
  selector: 'app-landing',
  imports: [RouterLink],
  templateUrl: './landing.html',
})
export class Landing {
  readonly categories: Category[] = [
    { emoji: '🔨', en: 'Carpenter', hi: 'कारपेंटर' },
    { emoji: '🧹', en: 'House Help', hi: 'घर का काम' },
    { emoji: '🚗', en: 'Driver', hi: 'ड्राइवर' },
    { emoji: '🍳', en: 'Cook', hi: 'रसोइया' },
    { emoji: '💡', en: 'Electrician', hi: 'इलेक्ट्रीशियन' },
    { emoji: '🛡️', en: 'Security Guard', hi: 'सिक्योरिटी गार्ड' },
    { emoji: '🌱', en: 'Gardener', hi: 'माली' },
    { emoji: '🏋️', en: 'Coach / Trainer', hi: 'कोच' },
    { emoji: '🔧', en: 'Plumber', hi: 'प्लंबर' },
    { emoji: '🎨', en: 'Painter', hi: 'पेंटर' },
  ];

  readonly seekerSteps = [
    ['Create profile with phone number', 'फोन नंबर से प्रोफ़ाइल बनाएं'],
    ['Select your skills & category', 'अपना काम और श्रेणी चुनें'],
    ['Get matched with nearby jobs', 'पास की नौकरियां पाएं'],
    ['Connect directly with employer', 'सीधे नियोक्ता से बात करें'],
  ];

  readonly employerSteps = [
    ['Post your job requirement', 'अपनी जरूरत पोस्ट करें'],
    ['Browse & get matched with nearby workers', 'पास के कामगार खोजें और मिलाएं'],
    ['Contact directly via call or chat', 'कॉल या चैट से सीधे संपर्क करें'],
    ['Hire and rate', 'नियुक्त करें और रेटिंग दें'],
  ];

  readonly testimonials = [
    {
      emoji: '👩🏽',
      name: 'अनीता, हाउस हेल्प, नोएडा',
      quoteHi: 'कामढूंढो से मुझे एक हफ्ते में 3 काम मिले!',
      quoteEn: 'Kaamdhoondo got me 3 jobs in one week!',
    },
    {
      emoji: '👨🏽',
      name: 'रमेश, इलेक्ट्रीशियन, दिल्ली',
      quoteHi: 'अब मुझे हर हफ्ते नए ग्राहक मिलते हैं।',
      quoteEn: 'Now I get new customers every week.',
    },
    {
      emoji: '👩🏾',
      name: 'सुनीता जी, दुकान मालिक, ग़ाज़ियाबाद',
      quoteHi: 'मुझे अपनी दुकान के लिए अच्छे कर्मचारी आसानी से मिल गए।',
      quoteEn: 'I easily found good staff for my shop.',
    },
  ];
}
