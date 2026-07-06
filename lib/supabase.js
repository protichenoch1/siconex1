import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://mrfejngefghunkwnpmxg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yZmVqbmdlZmdodW5rd25wbXhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMDYwMDksImV4cCI6MjA5Nzc4MjAwOX0.4RM7sgzGJD26G_jwfXXmcQvvOXzYXuVG08b91oRTSOQ"
);
