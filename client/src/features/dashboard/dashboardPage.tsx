import Navbar from "@/components/layout/navbar"
import { Route } from "@/routes/_authenticated.dashboard"


export const dashboardPage = () => {
    const { session } = Route.useRouteContext()
    return (
        <div>
            dashboardPage
            <p>Logged in as: **{session.user.email}**</p>
            <p>Your User ID: {session.user.id}</p>
            <Navbar />
        </div>

    )
}
