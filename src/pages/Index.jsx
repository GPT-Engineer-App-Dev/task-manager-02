import { useState } from 'react';
import { Container, VStack, Input, Button, List, ListItem, ListIcon, IconButton, useToast } from '@chakra-ui/react';
import { FaTrash, FaEdit, FaPlusCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const handleAddTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'Cannot add empty task.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input }]);
    setInput('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (id, newText) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task));
  };

  return (
    <Container centerContent maxW="container.md" p={4}>
      <VStack spacing={4} w="100%">
        <Input
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          size="lg"
        />
        <Button leftIcon={<FaPlusCircle />} colorScheme="blue" onClick={handleAddTask} w="100%">
          Add Task
        </Button>
        <List spacing={3} w="100%">
          {tasks.map((task) => (
            <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center">
              <span>{task.text}</span>
              <div>
                <IconButton
                  icon={<FaEdit />}
                  onClick={() => handleEditTask(task.id, prompt('Edit task:', task.text))}
                  aria-label="Edit task"
                  colorScheme="yellow"
                />
                <IconButton
                  icon={<FaTrash />}
                  onClick={() => handleDeleteTask(task.id)}
                  aria-label="Delete task"
                  colorScheme="red"
                />
              </div>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;