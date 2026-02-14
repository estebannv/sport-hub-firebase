# Sport Hub - Claude Code Project Instructions

## Project Overview
Sport Hub is a React Native mobile application built with Expo that provides sports facility management and booking functionality. The app includes user authentication, location services, wallet features, and facility search capabilities.

## Tech Stack
- **Framework**: React Native 0.81.5 with Expo ~54.0
- **Language**: TypeScript ~5.9
- **Navigation**: Expo Router (file-based routing)
- **State Management**: React hooks and context
- **Backend**: Remote API via ngrok tunnel (see `.env` file)
- **Key Libraries**:
  - expo-location for geolocation
  - react-native-reanimated for animations
  - @react-navigation for navigation components
  - react-native-modal for modal dialogs
  - react-native-element-dropdown for select inputs

## Project Structure
```
app/              # Main application screens (file-based routing)
  (tabs)/        # Tab-based navigation screens
  center/        # Center/facility related screens
  forgot-password/ # Password recovery flow
  registration/  # User registration flow
components/       # Reusable React components
constants/        # App constants and configuration
hooks/           # Custom React hooks
services/        # API services and backend integration
types/           # TypeScript type definitions
utils/           # Utility functions
assets/          # Images, fonts, and static resources
```

## Development Commands
- `npm run dev` - Start development server (offline mode, with cache clear)
- `npm run dev:tunnel` - Start with ngrok tunnel
- `npm start` - Start Expo server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web
- `npm run lint` - Run ESLint

## Coding Guidelines

### General Principles
- Write TypeScript with proper type definitions (avoid `any`)
- Use functional components with hooks (no class components)
- Follow React Native best practices for mobile performance
- Keep components small and focused on single responsibilities
- Use Expo Router's file-based routing conventions

### File Organization
- Place reusable UI components in `components/`
- Place screen components in appropriate `app/` subdirectories
- Define types in `types/` directory
- Keep API calls in `services/` directory
- Store utility functions in `utils/`

### React Native Specific
- Use Expo's cross-platform components when available
- Test on both iOS and Android when making UI changes
- Be mindful of safe area insets for notched devices
- Use react-native-reanimated for performant animations
- Optimize images and assets for mobile devices

### State Management
- Use React Context for global state when needed
- Prefer local state when possible
- Use AsyncStorage for persistent local data
- Keep API calls in service layer, not components

### Styling
- Use React Native StyleSheet.create() for styles
- Follow mobile-first responsive design
- Consider both iOS and Android platform differences
- Use consistent spacing and color schemes

### Environment Variables
- API endpoints are configured in `.env`
- Never commit sensitive credentials to git
- Use react-native-dotenv for environment variable access

## Important Notes
- The API URL uses ngrok tunnel for development (check `.env`)
- Always test authentication flows thoroughly
- Location permissions must be handled properly
- The app uses offline mode by default for faster development

## Git Workflow
- Main branch: `main`
- Current working branch: `master`
- Always test before committing
- Write clear, descriptive commit messages
- Review modified files before staging

## Common Tasks
- Adding a new screen: Create file in `app/` following Expo Router conventions
- Adding a new component: Create in `components/` with proper TypeScript types
- Modifying API calls: Update services in `services/` directory
- Adding dependencies: Use `npm install` and test thoroughly
- Debugging: Use React Native debugger and Expo dev tools

## Dependencies to Watch
- Keep Expo SDK version consistent across all expo-* packages
- React and React Native versions must be compatible
- Test thoroughly after any dependency updates

## Testing Strategy
- Test on both physical devices when possible
- Use Expo Go for quick testing
- Test authentication flows end-to-end
- Verify location services work correctly
- Check wallet/payment functionality carefully
