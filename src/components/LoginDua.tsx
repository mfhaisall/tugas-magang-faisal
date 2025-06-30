import { Link } from "react-router-dom";

export default function LoginDua() {
  return (
    <div className="flex">
      <div>
 <h1 className="text-2xl font-bold mb-4">Login</h1>
      
      <form className="space-y-4">
        <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
        <button className="w-full bg-blue-600 text-white py-2 rounded"> <Link to="/dashboard">login</Link></button>
      </form>
      </div>
     <div>
    
     </div>
    </div>
  );
}
