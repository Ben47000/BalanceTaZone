import useCheckAuth from "./Components/Hook/useCheckAuth.jsx"
import UserRouter from "./Router/UserRouter";

function App() {
console.log("http://localhost:5173/")

    const [user, isLoading] = useCheckAuth();
    return <UserRouter />;
   
};
export default App
