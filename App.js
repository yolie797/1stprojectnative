import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList,Button} from 'react-native-web';
import GoalItem from './components/goalItem';
import GoalInput from './components/goalInput';

export default function App() {
  const [modalIsVisible,setModalIsVisible]=useState(false);
  const [courseGoals,setCourseGoals]=useState([]);

  function startAddGoalHandler(){
    setModalIsVisible(true)
  }
  function endAddGoalHandler(){
    setModalIsVisible(false);
  }
  function addGoalHandler(enteredText){
   setCourseGoals((currentCourseGoals)=>[
    ...currentCourseGoals,
    {text:enteredText,id:Math.random().toString()},
  ]);
  endAddGoalHandler();
  }

  function deleteGoalHandler(id){
    setCourseGoals((currentCourseGoals)=>{
      return currentCourseGoals.filter((goal)=>goal.id !== id);
    })
  }

  return (
   <View style={styles.appContainer}>
    <Button
      title="Add New Goal"
      color='#5e0acc' 
      onPress={startAddGoalHandler}
      />
    <GoalInput 
      visible={modalIsVisible} 
      onAddGoal={addGoalHandler} 
      onCancel={endAddGoalHandler}
      />
    <View style={styles.goalContainer}>
    <FlatList 
    data={courseGoals}
    renderItem={(itemData)=>{
      return (
      <GoalItem 
      text={itemData.item.text} 
      id={itemData.item.id}
      onDeleteItem={deleteGoalHandler} />
  );
    }}
    keyExtractor={(item,index)=>{
      return item.id;
    }}
    />

   </View>
   </View>
  );
}

const styles=StyleSheet.create({
  appContainer:{
    flex:1,
    paddingTop:50,
    paddingHorizontal:16,
  },
  
  goalContainer:{
    flex:2
  },

})


