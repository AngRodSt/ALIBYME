# src/services/

Data access and AI logic:

- `apiClient.ts` → Axios/Fetch instance with JWT interceptor
- `authService.ts` → Login/register functions
- `animeService.ts` → Fetch, search, detail
- `userService.ts` → Favorites, watch status
- `collectionService.ts`
- `preferenceService.ts`
- `recommendationService.ts`
- `/ia/` → Open algorithms: SVD, TF-IDF, K-Means, Sentiment
- `/db/` → Migrations and SQL scripts for RDS
