import { getCustomerByUserId } from "@/actions/customers"
import { SelectCustomer } from "@/db/schema/customers"
import { currentUser } from "@clerk/nextjs/server"
import { Header } from "./header"

// Check if Clerk is configured
const hasClerkKey = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export async function HeaderWrapper() {
  let membership: SelectCustomer["membership"] | null = null

  // Only call Clerk if it's configured
  if (hasClerkKey) {
    const user = await currentUser()
    if (user) {
      const customer = await getCustomerByUserId(user.id)
      membership = customer?.membership ?? "free"
    }
  }

  return <Header userMembership={membership} />
}
