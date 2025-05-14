import { getUser } from "@/app/actions/auth";

export default async function Page() {
    const user = await getUser();
    
    if (!user) {
        return <div className="min-h-screen flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Not Authenticated</h1>
                <p className="mb-4">You are not logged in.</p>
                <a href="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Login
                </a>
            </div>
        </div>;
    }
    
    return (
        <div className="min-h-screen flex flex-col items-center p-8">
            <div className="max-w-2xl w-full">
                <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}</h1>
                <p className="text-gray-600 mb-4">Email: {user.email}</p>
                <p className="text-gray-600 mb-8">You are now logged in.</p>
            </div>
        </div>
    );
}