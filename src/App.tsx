
import TodoList from './components/TodoList';

function App() {
  

  return (
    <div className='px-2 lg:flex justify-center'>
      <div className='bg-[#60C0BF] max-w-[800px] shadow-2xl space-y-7 rounded-[8px] border-[1px] border-black px-3 lg:px-10 my-8 py-8 h-full'>
        <p className='md:text-[2.4rem] text-[1.5rem] font-bold mb-7'>Things to do:</p>
        <TodoList
        />
      </div>
    </div>
  );
}

export default App;
