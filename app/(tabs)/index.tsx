

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Keyboard, Animated, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const MOCK_AVATARS = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/65.jpg',
  'https://randomuser.me/api/portraits/women/12.jpg',
];

const FILTERS = ['Undone', 'Meetings', 'Consummation'];

const todayStr = new Date().toLocaleDateString('en-GB', {
  day: '2-digit', month: 'short', year: 'numeric', weekday: 'long',
});

export default function TodoApp() {
  const [todos, setTodos] = useState([
    { id: '1', text: 'Project daily stand-up', desc: 'At the conference center', time: '9:00 am', completed: false, avatars: [0,1], category: 'Meeting', priority: 'High', recurring: false },
    { id: '2', text: 'Internia new UI style', desc: 'Remember to bring presents', time: '11:00 am', completed: false, avatars: [2], category: 'Review', priority: 'Medium', recurring: false },
    { id: '3', text: 'Weekly Review', desc: 'Wanda Square E5.', time: '3:00 pm', completed: false, avatars: [1,3], category: 'Design project', priority: 'Low', recurring: false },
    { id: '4', text: 'Interview', desc: 'Remember to bring laptop', time: '6:00 pm', completed: false, avatars: [0], category: 'Meeting', priority: 'None', recurring: false },
  ]);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState(0);
  const [showInput, setShowInput] = useState(false);
  // Modal state
  const [selectedCategory, setSelectedCategory] = useState('Meeting');
  const [selectedPriority, setSelectedPriority] = useState('High');
  const [selectedAvatars, setSelectedAvatars] = useState([0]);
  const [recurring, setRecurring] = useState(false);

  const addTodo = () => {
    if (input.trim().length === 0) return;
    setTodos([
      ...todos,
      {
        id: Date.now().toString(),
        text: input,
        desc: '',
        time: '',
        completed: false,
        avatars: selectedAvatars,
        category: selectedCategory,
        priority: selectedPriority,
        recurring,
      },
    ]);
    setInput('');
    setShowInput(false);
    setSelectedCategory('Meeting');
    setSelectedPriority('High');
    setSelectedAvatars([0]);
    setRecurring(false);
    Keyboard.dismiss();
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(search.toLowerCase()) &&
    (activeFilter === 0 ? !todo.completed : true)
  );

  const renderItem = ({ item }) => (
    <Animated.View style={[styles.card, item.completed && styles.cardCompleted]}> 
      <TouchableOpacity style={{flex:1}} onPress={() => toggleComplete(item.id)}>
        <Text style={styles.cardTitle}>{item.text}</Text>
        {item.desc ? <Text style={styles.cardDesc}>{item.desc}</Text> : null}
        <View style={styles.cardFooter}>
          {item.time ? <Text style={styles.cardTime}>{item.time}</Text> : <View />}
          <View style={styles.avatarGroup}>
            {item.avatars.map(idx => (
              <Image key={idx} source={{uri: MOCK_AVATARS[idx]}} style={styles.avatar} />
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.headerTitle}>Today</Text>
          <Text style={styles.headerDate}>{todayStr}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="calendar-outline" size={28} color="#22223B" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <Ionicons name="search" size={20} color="#4EA8DE" style={{marginLeft: 10}} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.filterRow}>
        {FILTERS.map((f, i) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, activeFilter === i && styles.filterBtnActive]}
            onPress={() => setActiveFilter(i)}>
            <Text style={[styles.filterText, activeFilter === i && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTodos}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 8, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab} onPress={() => setShowInput(true)}>
        <Ionicons name="add" size={32} color="#fff" />
        <Text style={styles.fabText}>Add new task</Text>
      </TouchableOpacity>

      {/* Modal-like input at bottom */}
      {showInput && (
        <View style={styles.modalOverlay}>
          <View style={styles.inputModalFull}>
            <View style={styles.modalHandle} />
            <TextInput
              style={styles.inputFieldFull}
              placeholder="What do you need to do?"
              value={input}
              onChangeText={setInput}
              autoFocus
              onSubmitEditing={addTodo}
              placeholderTextColor="#b3d0f7"
            />
            {/* Categories */}
            <View style={styles.chipRow}>
              {['Meeting', 'Review', 'Marketing', 'Design project'].map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.chip, selectedCategory === cat && styles.chipActive, styles[`chip${cat.replace(/ /g, '')}`]]}
                  onPress={() => setSelectedCategory(cat)}>
                  <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextActive]}>{cat}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.chipAdd}><Ionicons name="add" size={18} color="#4EA8DE" /></TouchableOpacity>
            </View>
            {/* Priority */}
            <View style={styles.priorityRow}>
              <Text style={styles.priorityLabel}>Priority</Text>
              {['High', 'Medium', 'Low', 'None'].map(p => (
                <TouchableOpacity
                  key={p}
                  style={styles.priorityBtn}
                  onPress={() => setSelectedPriority(p)}>
                  <View style={[styles.radioOuter, selectedPriority === p && styles.radioOuterActive]}>
                    {selectedPriority === p && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.priorityText}>{p}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* Invite */}
            <View style={styles.inviteRow}>
              <Text style={styles.inviteLabel}>Invite</Text>
              <View style={styles.avatarGroupModal}>
                {MOCK_AVATARS.map((uri, idx) => (
                  <TouchableOpacity key={idx} onPress={() => {
                    setSelectedAvatars(selectedAvatars.includes(idx)
                      ? selectedAvatars.filter(i => i !== idx)
                      : [...selectedAvatars, idx]);
                  }}>
                    <Image source={{uri}} style={[styles.avatarModal, selectedAvatars.includes(idx) && styles.avatarSelected]} />
                  </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.avatarAdd}><Ionicons name="add" size={18} color="#4EA8DE" /></TouchableOpacity>
              </View>
            </View>
            {/* Recurring */}
            <View style={styles.recurringRow}>
              <TouchableOpacity style={[styles.recurringBtn, recurring && styles.recurringBtnActive]} onPress={() => setRecurring(!recurring)}>
                <Text style={[styles.recurringText, recurring && styles.recurringTextActive]}>Recurring</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtnFull} onPress={addTodo}>
                <Text style={styles.saveBtnTextFull}>Save</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.closeBtnFull} onPress={() => setShowInput(false)}>
              <Ionicons name="close" size={24} color="#22223B" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF6E9',
    paddingHorizontal: 0,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#22223B',
    letterSpacing: 0.5,
  },
  headerDate: {
    fontSize: 14,
    color: '#A0A0A0',
    marginTop: 2,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F0FA',
    marginHorizontal: 24,
    borderRadius: 18,
    marginBottom: 12,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 16,
    paddingHorizontal: 10,
    color: '#22223B',
    height: 36,
  },
  filterRow: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 12,
    gap: 8,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: '#F2F2F2',
  },
  filterBtnActive: {
    backgroundColor: '#4EA8DE',
  },
  filterText: {
    color: '#22223B',
    fontWeight: '500',
    fontSize: 15,
  },
  filterTextActive: {
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    marginHorizontal: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    justifyContent: 'center',
  },
  cardCompleted: {
    opacity: 0.5,
  },
  cardTitle: {
    fontSize: 18,
    color: '#22223B',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: 14,
    color: '#A0A0A0',
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTime: {
    fontSize: 13,
    color: '#4EA8DE',
    fontWeight: '600',
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginLeft: -8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    left: 24,
    right: 24,
    backgroundColor: '#4EA8DE',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    shadowColor: '#4EA8DE',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    gap: 8,
  },
  fabText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  modalOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.10)',
    justifyContent: 'flex-end',
    zIndex: 20,
  },
  inputModalFull: {
    backgroundColor: '#4EA8DE',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 36,
    minHeight: 420,
    position: 'relative',
  },
  modalHandle: {
    width: 48,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#b3d0f7',
    alignSelf: 'center',
    marginBottom: 18,
  },
  inputFieldFull: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 18,
    color: '#fff',
    marginBottom: 18,
  },
  chipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 18,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: '#e6f0fa',
    marginRight: 6,
  },
  chipActive: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#b3d0f7',
  },
  chipMeeting: { backgroundColor: '#fff9c4' },
  chipReview: { backgroundColor: '#e1bee7' },
  chipMarketing: { backgroundColor: '#ffcdd2' },
  chipDesignproject: { backgroundColor: '#ffe0b2' },
  chipAdd: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 7,
    borderWidth: 1,
    borderColor: '#b3d0f7',
  },
  chipText: {
    color: '#4EA8DE',
    fontWeight: '600',
    fontSize: 15,
  },
  chipTextActive: {
    color: '#22223B',
  },
  priorityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    gap: 8,
  },
  priorityLabel: {
    color: '#fff',
    fontWeight: '600',
    marginRight: 10,
    fontSize: 15,
  },
  priorityBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  radioOuterActive: {
    borderColor: '#22223B',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22223B',
  },
  priorityText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  inviteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  inviteLabel: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
    marginRight: 10,
  },
  avatarGroupModal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  avatarModal: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: -8,
    borderWidth: 2,
    borderColor: '#fff',
    opacity: 0.7,
  },
  avatarSelected: {
    opacity: 1,
    borderColor: '#22223B',
    borderWidth: 2.5,
  },
  avatarAdd: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 7,
    borderWidth: 1,
    borderColor: '#b3d0f7',
    marginLeft: 4,
  },
  recurringRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  recurringBtn: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 22,
  },
  recurringBtnActive: {
    backgroundColor: '#fff',
  },
  recurringText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  recurringTextActive: {
    color: '#4EA8DE',
  },
  saveBtnFull: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnTextFull: {
    color: '#4EA8DE',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeBtnFull: {
    position: 'absolute',
    top: 18,
    right: 18,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
});
