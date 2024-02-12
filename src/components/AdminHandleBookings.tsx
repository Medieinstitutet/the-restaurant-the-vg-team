import { AllBookings } from "./AdminAllBookings";
import { AdminSearchBooking } from "./AdminSearchBooking";

export const AdminHandleBooking = () => {
    const restaurantId = "65c6276ee125e85f5e15b79f";

    return (
        <>
        <div>
        <div>
        <h1>Admin Bokningshantering</h1>
        <div>
        <AllBookings restaurantId={restaurantId} />
        </div>
        </div>
        </div>
        </>
    )
}

