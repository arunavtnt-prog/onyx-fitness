import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create exercises
  const exercises = [
    {
      name: 'Barbell Bench Press',
      muscleGroup: 'Chest • Compound',
      type: 'strength',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgUeEKDm5ipw5A__J6h7qY7tjE9fKFS9EbslSlKIbxt6_KMEq3rcbtC_vNkTgJ4SNmbTvnJ6kzgiSjDHxR80NF0Qz_8TdW-a32VWvWUmXNpzj6zoxSx5CnacHRjdAEDK-cHURCvEGhWybD6FWVNjvkxwFa--0jUWU5SVNxW7gFWPvR7mdVEHtIyzowONpYuWGuYqDYS-EJzh2ITNOJ_z0K91BIzOIWpvgbAyIjWqfRwFjrlN4Vuh_z-_ra7HKMSmQQ4hX5WS5IpQ',
      defaultSets: 4,
      defaultReps: '8-10',
      defaultRest: 90,
    },
    {
      name: 'Incline Dumbbell Press',
      muscleGroup: 'Chest • Compound',
      type: 'strength',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0mVvs5Tvl50WjGpfwEQhpyE4zZbvezSQL_sFbu95chrGq3owR3FIc4Yml6Z35ZrSfA_pss0jPFVsVu9Vgw9Fo-m0iJn_6X_E0RDvfH4BAJ1HLtAlLQqq8sbTyLFOJwY_xp_A3pPPoMxgllIejVR7fasOEXu5v-m3DZteyoY6htJ0MajMHRUoFOlR3pgXmdq0FBNZmniqp8LIaTQLbP4nHz4wp01al-69wb3GoMyfsxmGIJozDxpoUFYoWbj24OTgkSOF10DF2VQ',
      defaultSets: 3,
      defaultReps: '10-12',
      defaultRest: 60,
    },
    {
      name: 'Weighted Pullups',
      muscleGroup: 'Back • Compound',
      type: 'strength',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEUGOeGjFbOhaXDRbJ84n1YjHqlXIvIcoJ3PZf-JopXqzRv6STav4Y_ZjbX8HzFL8xiqXgBdfXuWLY2Jxj5Thscv5QRKbk-Fot75PVvG6HVWJMyUhfjrPP97qSUEn36RDnaf28e6vaWLGDxiFASKRij3iuQyjqBIqVL2xzur54jNYjCx49tgB024utJYi__HrOXKsGHnxr1NFRZrNuJ_Ns0_PsA91VvgVhpmymEKmAiuuw18RL3zYsxcFTPHGPi3hmn-94MYOpYA',
      defaultSets: 3,
      defaultReps: 'AMRAP',
      defaultRest: 120,
    },
    {
      name: 'Barbell Squat',
      muscleGroup: 'Legs • Compound',
      type: 'strength',
      image: null,
      defaultSets: 4,
      defaultReps: '6-8',
      defaultRest: 120,
    },
    {
      name: 'Deadlift',
      muscleGroup: 'Back • Compound',
      type: 'strength',
      image: null,
      defaultSets: 3,
      defaultReps: '5',
      defaultRest: 180,
    },
    {
      name: 'Overhead Press',
      muscleGroup: 'Shoulders • Compound',
      type: 'strength',
      image: null,
      defaultSets: 4,
      defaultReps: '8-10',
      defaultRest: 90,
    },
    {
      name: 'Lateral Raises',
      muscleGroup: 'Shoulders • Isolation',
      type: 'strength',
      image: null,
      defaultSets: 3,
      defaultReps: '12-15',
      defaultRest: 45,
    },
    {
      name: 'Bicep Curls',
      muscleGroup: 'Arms • Isolation',
      type: 'strength',
      image: null,
      defaultSets: 3,
      defaultReps: '10-12',
      defaultRest: 60,
    },
    {
      name: 'Tricep Extensions',
      muscleGroup: 'Arms • Isolation',
      type: 'strength',
      image: null,
      defaultSets: 3,
      defaultReps: '12-15',
      defaultRest: 60,
    },
    {
      name: 'Plank',
      muscleGroup: 'Core • Isolation',
      type: 'strength',
      image: null,
      defaultSets: 3,
      defaultReps: '60s',
      defaultRest: 60,
    },
    {
      name: 'Running',
      muscleGroup: 'Cardio',
      type: 'cardio',
      image: null,
      defaultSets: 1,
      defaultReps: '30min',
      defaultRest: 0,
    },
    {
      name: 'Cycling',
      muscleGroup: 'Cardio',
      type: 'cardio',
      image: null,
      defaultSets: 1,
      defaultReps: '45min',
      defaultRest: 0,
    },
    {
      name: 'Burpees',
      muscleGroup: 'Full Body • Compound',
      type: 'hiit',
      image: null,
      defaultSets: 3,
      defaultReps: '15',
      defaultRest: 60,
    },
    {
      name: 'Mountain Climbers',
      muscleGroup: 'Core • Compound',
      type: 'hiit',
      image: null,
      defaultSets: 3,
      defaultReps: '30s',
      defaultRest: 30,
    },
    {
      name: 'Jump Rope',
      muscleGroup: 'Cardio',
      type: 'cardio',
      image: null,
      defaultSets: 5,
      defaultReps: '1min',
      defaultRest: 60,
    },
    {
      name: 'Romanian Deadlift',
      muscleGroup: 'Legs • Compound',
      type: 'strength',
      image: null,
      defaultSets: 3,
      defaultReps: '8-10',
      defaultRest: 90,
    },
    {
      name: 'Leg Press',
      muscleGroup: 'Legs • Compound',
      type: 'strength',
      image: null,
      defaultSets: 4,
      defaultReps: '10-12',
      defaultRest: 90,
    },
    {
      name: 'Lat Pulldown',
      muscleGroup: 'Back • Compound',
      type: 'strength',
      image: null,
      defaultSets: 3,
      defaultReps: '10-12',
      defaultRest: 60,
    },
    {
      name: 'Face Pulls',
      muscleGroup: 'Shoulders • Isolation',
      type: 'strength',
      image: null,
      defaultSets: 3,
      defaultReps: '15',
      defaultRest: 45,
    },
    {
      name: 'Dips',
      muscleGroup: 'Triceps • Compound',
      type: 'strength',
      image: null,
      defaultSets: 3,
      defaultReps: '10-12',
      defaultRest: 90,
    },
  ];

  // Get existing exercise names
  const existingExercises = await prisma.exercise.findMany({
    select: { name: true }
  });
  const existingNames = new Set(existingExercises.map(e => e.name));

  // Filter out duplicates and create
  const newExercises = exercises.filter(e => !existingNames.has(e.name));
  let count = 0;

  for (const exercise of newExercises) {
    await prisma.exercise.create({ data: exercise });
    count++;
  }

  console.log(`✅ Created ${count} new exercises (${exercises.length} total)`);

  console.log('🌱 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
