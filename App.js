//npm install -g expo-cli
//npx create-expo-app@latest myapp --template blank


import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native';

export default function App() {
  // useState: store input text and selected filter.
  const [name, setName] = useState('');
  const [filter, setFilter] = useState('All');
  const [nextId, setNextId] = useState(3);


  // Date.now(): current timestamp in milliseconds.
const timestamp = Date.now();

// Convert the timestamp into a Date object.
const currentDate = new Date(timestamp);

// Convert the Date object into a readable string.
const formattedDate = currentDate.toLocaleDateString();

// Set the current date as the initial input value.
const [date, setDate] = useState(formattedDate);

//useeffect
// useEffect(() => {
//     console.log('Current count:', count);
//   }, [count]);


const [search, setSearch] = useState('');
//search function
const searchTasks = (list) => {
  if (search === '') {
    return list;
  } else {
    return list.filter((task) =>
      task.Name.toLowerCase() === search.toLowerCase()//includes(search.toLowerCase())
    );
  }
};
  // Array of objects: each object represents a task.
  // Status: false = Pending; true = Done.
  const [tasks, setTasks] = useState([
    { id: 1, Name: 'Study JavaScript', Status: false },
    { id: 2, Name: 'Read notes', Status: true },
  ]);

  // Array of strings.
  const filters = ['All', 'Pending', 'Done'];

  // ADD: create an object and add it to a new array.
  const addTask = () => {

    const newTask = {
      id: nextId,
      Name: name,
      Status: false,
      Date: date,
    };
    setDate(new Date().toLocaleDateString());

    setTasks([...tasks, newTask]);
    setNextId(nextId + 1);
    setName('');
  };

  // UPDATE: map checks each task; update the matching ID.
  const toggleTask = (id) => {
    const updated = tasks.map((task) => {
      if (task.id === id) {
        // Spread copies the object; ! reverses true/false.
        return { ...task, Status: !task.Status };
      } else {
        return task;
      }
    });

    setTasks(updated);
  };

  // DELETE: filter keeps tasks with different IDs.
  const deleteTask = (id) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
  };

  // CLEAR DONE: keep only pending tasks.
  const clearDone = () => {
    const updated = tasks.filter((task) => task.Status === false);
    setTasks(updated);
  };

  // FILTER: if/else chooses which tasks to display.
  let filteredTasks;

  if (filter === 'Pending') {
    filteredTasks = tasks.filter((task) => task.Status === false);
  } else if (filter === 'Done') {
    filteredTasks = tasks.filter((task) => task.Status === true);
  } else {
    filteredTasks = tasks;
  }

  // COUNT: length gives the number of elements.
  const total = tasks.length;
  const done = tasks.filter((task) => task.Status === true).length;
  const pending = total - done;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>My Todo</Text>
      <Text style={styles.subtitle}>Plan a little. Do a lot.</Text>

      {/* Flex row: three equal-width summary cards. */}
      <View style={styles.row}>
        <View style={[styles.summary, { backgroundColor: '#e8d8ff' }]}>
          <Text style={styles.number}>{total}</Text>
          <Text>Total</Text>
        </View>

        <View style={[styles.summary, { backgroundColor: '#fff2cc' }]}>
          <Text style={styles.number}>{pending}</Text>
          <Text>Pending</Text>
        </View>

        <View style={[styles.summary, { backgroundColor: '#d9f2df' }]}>
          <Text style={styles.number}>{done}</Text>
          <Text>Done</Text>
        </View>
      </View>

      {/* TextInput: value and onChangeText connect it to state. */}
      <View style={styles.row}>
        <TextInput
          placeholder="Enter a new task"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        {/* Function name: run it when pressed. */}
        <Pressable style={styles.addButton} onPress={addTask}>
          <Text style={styles.whiteText}>+</Text>
        </Pressable>
      </View>

      {/* Map strings into filter buttons. */}
      <View style={styles.row}>
        {filters.map((item) => (
          <Pressable
            key={item}
            onPress={() => setFilter(item)}
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  filter === item ? 'purple' : '#e8d8ff',
              },
            ]}
          >
            <Text style={{ color: filter === item ? 'white' : 'black' }}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Today's Tasks</Text>

      {/* Map objects into task cards. */}
      {filteredTasks.map((task) => (
        <View key={task.id} style={styles.taskCard}>
          {/* Arrow function: pass the task's ID. */}
          <Pressable
            style={styles.checkbox}
            onPress={() => toggleTask(task.id)}
          >
            <Text>{task.Status ? '✓' : ''}</Text>
          </Pressable>

          <View style={{ flex: 1 }}>
            {/* Conditional styling. */}
            <Text
              style={{
                fontSize: 16,
                textDecorationLine:
                  task.Status ? 'line-through' : 'none',
                color: task.Status ? 'gray' : 'black',
              }}
            >
              {task.Name}
            </Text>

            {/* Ternary: condition ? true value : false value. */}
            <Text style={{ color: task.Status ? 'green' : 'orange' }}>
              {task.Status ? 'Done' : 'Pending'}
            </Text>
          </View>

          <Pressable onPress={() => deleteTask(task.id)}>
            <Text style={{ color: 'red' }}>Delete</Text>
          </Pressable>
        </View>
      ))}

      {/* && shows a message only when the condition is true. */}
      {filteredTasks.length === 0 && (
        <Text style={{ textAlign: 'center', padding: 20 }}>
          No tasks to show
        </Text>
      )}

      <Text style={styles.progress}>
        {done} of {total} tasks completed
      </Text>

      <Pressable style={styles.clearButton} onPress={clearDone}>
        <Text style={{ color: 'purple' }}>Clear completed</Text>
      </Pressable>

       {/* <Text style={{color:pers.isUni==true?'red':'green'}}>{pers.isUni==true?'Student':'Graduated'}</Text> */}
      <View style={{ flexDirection: 'row' }}>
  <View style={{ flex: 1, height: 50, backgroundColor: 'purple' }} />
  <View style={{ flex: 2, height: 50, backgroundColor: 'orange' }} />
</View>
    </ScrollView>
  );
}

// DESIGN:
// margin = space outside; padding = space inside.
// flexDirection: 'row' = horizontal arrangement.
// In a row: justifyContent = horizontal; alignItems = vertical.
// Both set to 'center' centre a button's content.


//parent component
import { View } from 'react-native';
import TaskCard from './TaskCard';

export default function App() {
  return (
    <View style={{ padding: 30, paddingTop: 60 }}>
      {/* Pass values to the child using props. */}
      <TaskCard
        name="Study JavaScript"
        done={false}
        date="2026-10-01"
      />
    </View>
  );
}
//child component
import { View, Text } from 'react-native';

// Receive the props sent by the parent.
export default function TaskCard({ name, done, date }) {
  return (
    <View style={{ backgroundColor: '#e8d8ff', padding: 20 }}>
      <Text>Task: {name}</Text>
      <Text>Status: {done ? 'Done' : 'Pending'}</Text>
      <Text>Date: {date}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#f7f5fa',
    flexGrow: 1,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 5,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  summary: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
  },
  addButton: {
    width: 50,
    backgroundColor: 'purple',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteText: {
    color: 'white',
    fontSize: 25,
  },
  filterButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: 'purple',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    textAlign: 'center',
    backgroundColor: '#e8d8ff',
    padding: 20,
    borderRadius: 10,
    marginTop: 15,
  },
  clearButton: {
    padding: 15,
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#e8d8ff',
    padding: 20,
    marginBottom: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});