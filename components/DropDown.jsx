import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../ThemeContext';
import { login_style } from '../styles/login';

const DropDown = ({
  label,
  options = [],
  placeholder = 'Select an option',
  value,
  onSelect,
  style,
}) => {
  const [visible, setVisible] = useState(false);
  const theme = useTheme()

  const handleSelect = (item) => {
    onSelect(item);
    setVisible(false);
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[login_style.typetext, theme.textColor]}>{label}</Text>}
      {/* The input-like pressable box */}
      <TouchableOpacity
        style={[styles.inputBox, theme.textField]}
        onPress={() => setVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={[styles.inputText, theme.textColor]}>
          {value || placeholder}
        </Text>
        <Icon name="chevron-down" size={20} color={theme.textColor.color}/>
      </TouchableOpacity>
      {/* Modal dropdown list */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setVisible(false)}>
          <View style={[styles.dropdownContainer, theme.container]}>
            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={[styles.itemText, theme.textColor]}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  inputText: {
    color: '#000',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    borderRadius: 8,
    maxHeight: 250,
    padding: 8,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
  },
});



export default DropDown;