# src/hooks/

ViewModel Hooks (`"use client"`):

Each hook encapsulates a use case:

- `useAuth.ts` → Login/Logout, JWT, user state
- `useModal.ts` → Modal control (login/register)
- `useSearchAnimes.ts` → Search with debounce
- `useFavorites.ts` → Favorites CRUD (optimistic UI)
- `useWatchStatus.ts` → ToWatch/Watching/Watched states
- `useCollections.ts` → CRUD and reordering of collections
- `usePreferences.ts` → Get/Update preferences
- `useRecommendations.ts`→ Recommendation logic + cache
- `useTheme.ts` → Dark/Light mode
- `/anime/` → Anime fetching carousels
