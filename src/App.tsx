
import TodoList from './components/TodoList';

function App() {
  

  return (
    <div className='px-12 flex justify-center'>
      <div className='bg-[#60C0BF] w-[800px] space-y-7 rounded-[8px] border-[2px] border-black px-10 my-8 py-8 h-full'>
        <p className='text-[2.4rem] font-bold mb-7'>Things to do:</p>
        <TodoList
        />
      </div>
    </div>
  );
}

export default App;
