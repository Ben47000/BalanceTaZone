import useCheckAuth from "./Hook/useCheckAuth";
import UserRouter from "./Router/UserRouter";

function App() {
console.log("http://localhost:5173/")

    const [user, isLoading] = useCheckAuth();
    return <UserRouter />;
   
};
export default App
