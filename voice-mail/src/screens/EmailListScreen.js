import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import EmailCard from '@components/EmailCard';
import { COLORS } from '@constants/colors';

export default function EmailListScreen({ route, navigation }) {
  const { emails = [], currentIndex = 0 } = route.params ?? {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Zurück</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{emails.length} Mails</Text>
      </View>
      <FlatList
        data={emails}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <EmailCard
            email={item}
            isActive={index === currentIndex}
            onPress={(email) => navigation.navigate('EmailDetail', { email })}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    gap: 16,
  },
  back: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '600',
  },
  list: {
    paddingBottom: 40,
  },
});
