import { FeedItem } from './types';

export const MOCK_FEED_ITEMS: FeedItem[] = [
    {
        id: '1',
        user: {
            name: 'Sarah Jenkins',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3LXv0hyg_gQfw0uefPJgxlC_tmp69JehLkzGJ3KhkgiCfqpoB2mA4MChlyaZ9N7eARXw_eZUz18BdtyLKeDiKx0iiuCjn-P5zS8lyK7S1L3LSzMSHBxRHrKMcK8s0r3-11noL2lwTyOZ-EkGNJT_tweatuAWg-2vOTal22cmfeaa_pNq4HxR66HlkYtd19BhnZ2vEoIONS4CoPF9lLhUxxl88BAY68gf4z-mFQjCo_84qdbwfPHn3DkHc09af0zNzahqmf5cVQA'
        },
        timeAgo: '2h ago',
        title: 'Upper Body Power',
        tags: [
            { label: 'INTENSITY', type: 'intensity' },
            { label: '90m', type: 'duration' }
        ],
        description: 'Crushed a new PR on bench today! Focus was on explosive movements and controlled negatives.',
        stats: [
            { label: 'Bench Press', value: '225', unit: 'LBS' },
            { label: 'Volume', value: '12.5', unit: 'K LBS' }
        ],
        likes: 248,
        comments: 12,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmEdSwyneUghJtxgrlNJMXGQHVN653Pn0TlBC5x0uNGAMLfZWj6CLP842UVlf7QUxLGXG1TOSR8adVLeCHvQBqGArJ0l7ivHvBCm1_oJXOkh2x4_USPf91B4V_TtN_bbgkwhO4Teyp2eMLLBjzn1pvga02xuZ4P7-BE4Cz3kqDRnZRq9spLzhK4_6qH2OAnXa-UQpe3OTodtpW_-clpFkwUgR1_rU5utOxOCryGARbTGx_YrwwTO4hjBO58QR2UG4TFDv0gn86FA',
        exercisesCount: 7,
        type: 'lift'
    },
    {
        id: '2',
        user: {
            name: 'Mike Ross',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC59ldF7hQI9ljnI0C8gDGJsPhrQzopYAOt6-NcfjxOni-9ZHl67RmB9uVZ1-FRAAFak2ODEcczhRwOy29jcdu3kAuxd3JDPZrcHaO54IcGDcwvvF-unmathP7dk1p72pFqYI1awE2P-l-UJYgohRmvXNywL8t6R1mLoTPsXssrzDjD7-e8q3pgcCU7sxh_XEc5nsF-vuv_ID1FcJd5y6q_l8Hd71wqO1aAqu_jLELvmCo9ozcBCq1OHm4nFdHwUJkrOwAxVaZwJQ'
        },
        timeAgo: '5h ago',
        title: 'Sunday Long Run',
        tags: [
            { label: 'ENDURANCE', type: 'intensity' },
            { label: '1h 12m', type: 'duration' }
        ],
        stats: [
            { label: 'Distance', value: '15.0', unit: 'km' },
            { label: 'Pace', value: '4:48', unit: '/km' },
            { label: 'Cal', value: '840', unit: 'kcal' }
        ],
        likes: 842,
        comments: 45,
        mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt8Ad7bc_2bX73D4fBGHXz0sOf5tiGJiFZwyWIPJ3-yai63g3A9fno1S-L0p-mMfxfU6NxiG_lm4lt3_CyIWFNfAqaXZZxPyFrublWPGMPdwa-ZYE_pgxR3q__ik3j1d_O8s153AxKYk4AwAeotJ-6MkzyDfWz2A3UO-u__v1mcdNvQ0trN3nuziI0Lrv6sEmiesOK3Jpaw-t6G7WfZ8X-FvjINNVh1lYDp0z0lb8qtMiyLf1LBGVRIalCbKuB7GjijVIlbjZ4ww',
        location: 'Central Park',
        type: 'run'
    }
];

export const MOCK_EXERCISES = [
    {
        id: '1',
        name: 'Barbell Bench Press',
        muscleGroup: 'Chest • Compound',
        type: 'strength',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgUeEKDm5ipw5A__J6h7qY7tjE9fKFS9EbslSlKIbxt6_KMEq3rcbtC_vNkTgJ4SNmbTvnJ6kzgiSjDHxR80NF0Qz_8TdW-a32VWvWUmXNpzj6zoxSx5CnacHRjdAEDK-cHURCvEGhWybD6FWVNjvkxwFa--0jUWU5SVNxW7gFWPvR7mdVEHtIyzowONpYuWGuYqDYS-EJzh2ITNOJ_z0K91BIzOIWpvgbAyIjWqfRwFjrlN4Vuh_z-_ra7HKMSmQQ4hX5WS5IpQ',
        sets: 4,
        reps: '8-10',
        rest: 90
    },
    {
        id: '2',
        name: 'Incline Dumbbell Press',
        muscleGroup: 'Chest • Compound',
        type: 'strength',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0mVvs5Tvl50WjGpfwEQhpyE4zZbvezSQL_sFbu95chrGq3owR3FIc4Yml6Z35ZrSfA_pss0jPFVsVu9Vgw9Fo-m0iJn_6X_E0RDvfH4BAJ1HLtAlLQqq8sbTyLFOJwY_xp_A3pPPoMxgllIejVR7fasOEXu5v-m3DZteyoY6htJ0MajMHRUoFOlR3pgXmdq0FBNZmniqp8LIaTQLbP4nHz4wp01al-69wb3GoMyfsxmGIJozDxpoUFYoWbj24OTgkSOF10DF2VQ',
        sets: 3,
        reps: '10-12',
        rest: 60
    },
    {
        id: '3',
        name: 'Weighted Pullups',
        muscleGroup: 'Back • Compound',
        type: 'strength',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEUGOeGjFbOhaXDRbJ84n1YjHqlXIvIcoJ3PZf-JopXqzRv6STav4Y_ZjbX8HzFL8xiqXgBdfXuWLY2Jxj5Thscv5QRKbk-Fot75PVvG6HVWJMyUhfjrPP97qSUEn36RDnaf28e6vaWLGDxiFASKRij3iuQyjqBIqVL2xzur54jNYjCx49tgB024utJYi__HrOXKsGHnxr1NFRZrNuJ_Ns0_PsA91VvgVhpmymEKmAiuuw18RL3zYsxcFTPHGPi3hmn-94MYOpYA',
        sets: 3,
        reps: 'AMRAP',
        rest: 120
    }
];

export const MOCK_HISTORY = [
    { id: 1, name: 'Leg Day Alpha', date: 'Yesterday', duration: '1h 15m', volume: '12,400 lbs' },
    { id: 2, name: 'Pull Strength', date: 'Mon, Mar 2', duration: '55m', volume: '8,200 lbs' },
    { id: 3, name: 'Cardio Intervals', date: 'Sun, Mar 1', duration: '45m', volume: '3.2 mi' },
];