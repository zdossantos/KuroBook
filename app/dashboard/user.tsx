import { Button } from '@/components/ui/button';
import { auth } from '@/app/server/auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import {
  DropdownMenu, 
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { headers } from "next/headers"


export async function User() {
  const session = await auth.api.getSession({
    headers: await headers()
});
  const user = session?.user;

  // If not authenticated, you could redirect or just show the Sign In option
  // If you want to force login, uncomment below:
  // if (!user) redirect('/login');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={user?.image ?? '/placeholder-user.jpg'}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuItem>
            <form
            action={async () => {
              'use server';
              // Use better-auth's signOut method, which may require a redirect
              await auth.api.signOut({
                headers: await headers()
              });
              redirect('/login');
            }}
          >
            <button type="submit">Sign Out</button>
          </form>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Link href="/login">Sign In</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
