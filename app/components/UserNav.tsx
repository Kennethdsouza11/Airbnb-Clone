import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Link, MenuIcon } from "lucide-react";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"; //helps with authentication in Next.js applications, particularly with Kinde. getKindeServerSession helps to get the current session information on the server side.

export async function UserNav() {
  //async means the function is asynchronous that allows the function to perform operations that take time without blocking the rest of the code from running.
  const { getUser } = getKindeServerSession(); //calls the getKindeServerSession and extracts the getUser function from its returned result.{ getUser } is destructing the function to get the information.
  const user = await getUser(); //await is used here to wait till the information is retrieved from the getUser function and then move on to the next line of code.
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full border flex items-center px-2 py-2 lg:px-4 lg:py-4 gap-x-3">
          <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
          <img
            src={
              user?.picture ??
              "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            alt="default profile"
            className="rounded-full w-8 h-8 hidden lg:block"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {user ? (
          //we use <></>because we need to wrap multiple items in a single element. This <></> is called a react fragment and its different from <div> as it does not create any extra DOM.
          <>
            <DropdownMenuItem>
              <form className="w-full">
                <button type="submit" className="w-full text-start">
                  Airbnb your Home
                </button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/my-homes" className="w-full">
                My Listings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/favourites" className="w-full">
                My Favourites
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/reservations" className="w-full">
                My Reservations
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutLink className="w-full">Logout</LogoutLink>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <RegisterLink className="w-full">Register</RegisterLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LoginLink className="w-full">Login</LoginLink>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
