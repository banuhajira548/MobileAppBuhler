import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/(app)/home" />;
}

// Add this export to hide the page from navigation
Index.options = {
  headerShown: false,
  href: null
}; 