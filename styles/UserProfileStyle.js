import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
  fontSize: 28,
  fontWeight: '700',
  color: '#034974',
  letterSpacing: 0.5
},
  profileIcon: {
  height: 48,
  width: 48,
  borderRadius: 24,
  backgroundColor: '#E0E7FF',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadowColor: '#000',
  boxShadowOpacity: 0.1,
  boxShadowRadius: 4,
  elevation: 3
},
welcomeText: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 16,
    textAlign: 'center'
},
  content: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadowColor: '#000',
    boxShadowOpacity: 0.05,
    boxShadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
  fontSize: 13,
  color: '#6B7280', // softer gray
  marginBottom: 2,
  textTransform: 'uppercase',
  letterSpacing: 1
},
cardValue: {
  fontSize: 17,
  fontWeight: '600',
  color: '#1F2937'
},
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  membershipBadge: {
  alignSelf: 'flex-start',
  paddingVertical: 4,
  paddingHorizontal: 10,
  borderRadius: 12,
  marginTop: 4,
  marginBottom: 8
},
renterBadge: {
  backgroundColor: '#E0F2FE', // light blue
},
premiumBadge: {
  backgroundColor: '#FDE68A', // gold
},
freeBadge: {
  backgroundColor: '#E5E7EB', // gray
},
badgeText: {
  fontSize: 12,
  fontWeight: '600',
  color: '#1F2937'
}
});


export const theme = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
  },
  textColor: {
    color: '#333',
  },
  textField: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    boxShadowColor: '#000',
    boxShadowOpacity: 0.05,
    boxShadowRadius: 4,
    elevation: 2,
  },
});

