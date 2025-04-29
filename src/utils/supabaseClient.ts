import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://whvvgampopqrjkdnhoyk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndodnZnYW1wb3BxcmprZG5ob3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NjAyMzYsImV4cCI6MjA1ODQzNjIzNn0.ZC3cLRgQtBWD3YJQucRCAv4QE9IBMkioSr_Ggrml5dU';

export const supabase = createClient(supabaseUrl, supabaseKey);