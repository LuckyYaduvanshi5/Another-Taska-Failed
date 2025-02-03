import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { List, Text } from 'react-native-paper';
import { Database } from '../../types/database';

type Task = Database['public']['Tables']['tasks']['Row'];

interface TaskListProps {
  tasks: Task[];
  onTaskPress: (task: Task) => void;
}

export function TaskList({ tasks, onTaskPress }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No tasks found</Text>
      </View>
    );
  }

  const renderItem = ({ item: task }: { item: Task }) => (
    <List.Item
      title={task.title}
      description={task.description}
      left={props => (
        <List.Icon
          {...props}
          icon={task.status === 'completed' ? 'check-circle' : 'circle-outline'}
        />
      )}
      right={props => (
        <Text {...props} style={[props.style, styles.priority]}>
          Priority: {task.priority}
        </Text>
      )}
      onPress={() => onTaskPress(task)}
    />
  );

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.list}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priority: {
    alignSelf: 'center',
  },
}); 