// Script to generate and insert careers into Supabase
// Run this with: node scripts/seed-careers.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function generateCareers() {
  try {
    console.log('🤖 Generating careers with Gemini AI...');
    
    const response = await fetch('http://localhost:3000/api/generate-careers');
    const data = await response.json();
    
    if (!data.success) {
      throw new Error('Failed to generate careers');
    }

    console.log(`✅ Generated ${data.count} careers`);
    console.log('💾 Inserting into Supabase...');

    const { error } = await supabase
      .from('careers')
      .insert(data.careers);

    if (error) {
      console.error('❌ Error inserting careers:', error);
      return;
    }

    console.log('🎉 Successfully inserted careers!');
    console.log(`📊 Total careers added: ${data.count}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

generateCareers();