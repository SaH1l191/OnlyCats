import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CoverImage from "./CoverImage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/db/prisma";
import { getUserProfileAction } from "@/app/update-profile/actions";

const UserProfile = async() => { 

	const admin =await prisma.user.findUnique({
		where :{
			email :process.env.ADMIN_EMAIL!
		}
	})
	const currentUser=await getUserProfileAction()

	return (
		<div className='flex flex-col '>
			<CoverImage />
			<div className='flex flex-col p-4'>
				<div className='flex flex-col md:flex-row gap-4 justify-between'>
					<Avatar className='w-20 h-20 border-2 -mt-10'>
						<AvatarImage src={admin?.image || "/user-placeholder.png"} className='object-cover' />
						{/* when avatar image is not available */}
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>

					<div className='flex'>
						{!currentUser?.isSubscribed && (
							<Button asChild className='rounded-full flex gap-10 '>
								<Link href={"/pricing"}>
									<span className='uppercase font-semibold tracking-wide   text-primary-foreground'>Subscribe</span>
								</Link>
							</Button>
						)}

						{currentUser?.isSubscribed && (
							<Button className='rounded-full flex gap-10' variant={"outline"}>
								<span className='uppercase font-semibold tracking-wide text-primary-foreground'>Subscribed</span>
							</Button>
						)}
					</div>
				</div>
				<div className='mt-4 flex flex-col'>
					<p className='text-lg font-semibold '>{admin?.name}</p>
					<p className='text-sm mt-2 md:text-md'>
						Discover daily tips and tricks for cat health and care, along with insights into my personal
						routine with my cats. Subscribe now to gain access to exclusive content and become part of the
						community.
					</p>
				</div>
			</div>
			{/* seperator  */}
			<div className='h-1 w-full bg-muted' />

		</div>


	)
}

export default UserProfile