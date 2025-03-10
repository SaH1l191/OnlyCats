import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AnalyticsTab = () => {
	return (
		<>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
				<Card className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
						<DollarSign className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent className=''>
						<div className='text-2xl font-bold'>${0}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Sales</CardTitle>
						<DollarSign className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>+{234234}</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Subscriptions</CardTitle>
						<DollarSign className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>+{2}</div>
					</CardContent>
				</Card>


			</div>

			<div className='flex flex-wrap gap-5 my-5'>
				<RecentSubscriptions />
				<RecentSales />
			</div>
		</>
	)
}

export default AnalyticsTab




const RecentSubscriptions = async () => {
	const recentSubscriptions = [
		{
			user: {
				name: "John Doe",
				email: "john@email.com",
				image: "",
			},
			price: 10_00,
		},
		{
			user: {
				name: "Jane Doe",
				email: "jane@email.com",
			},
			price: 20_00,
		},
	];


	return (
		<Card className='flex-1'>
			<CardHeader className='px-3'>
				<CardTitle>Recent Subscriptions</CardTitle>
			</CardHeader>
			<CardContent className='grid gap-8 px-3'>
				{recentSubscriptions.length === 0 && (
					<p className='text-sm text-muted-foreground'>No recent subscriptions</p>
				)}

				{recentSubscriptions.map((subscription) => (
					<div className='flex items-center gap-2' key={subscription.user.email}>
						<Avatar className='hidden h-9 w-9 sm:flex'>
							<AvatarImage
								src={subscription.user.image || "/user-placeholder.png"}
								alt='Avatar'
								className='object-cover'
							/>
							<AvatarFallback>{subscription?.user?.name![0] || ""}</AvatarFallback>
						</Avatar>
						<div className='grid gap-1'>
							<p className='text-xs font-medium leading-none'>{subscription.user.name}</p>
							<p className='text-xs text-muted-foreground'>{subscription.user.email}</p>
						</div>
						<div className='ml-auto font-medium'>+${subscription.price}</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
};

const RecentSales = async () => {
	const recentSales = [
		{
			user: {
				name: "John Doe",
				email: "john@email.com",
				image: "",
			},
			price: 10_00,
		},
		{
			user: {
				name: "Jane Doe",
				email: "jane@email.com",
				image: "",
			},
			price: 20_00,
		},
	];

	return (
		<Card className='flex-1'>
			<CardHeader className='px-3'>
				<CardTitle>Recent Sales</CardTitle>
			</CardHeader>
			<CardContent className='grid gap-8 px-3'>
				{recentSales.length === 0 && <p className='text-sm text-muted-foreground'>No recent sales</p>}
				{recentSales.map((order) => (
					<div className='flex items-center gap-2' key={order.user.email}>
						<Avatar className='hidden h-9 w-9 sm:flex'>
							<AvatarImage
								src={order.user.image || "/user-placeholder.png"}
								alt='Avatar'
								className='object-cover'
							/>
							<AvatarFallback>
								<p>{order?.user?.name![0] || ""}</p>
							</AvatarFallback>
						</Avatar>
						<div className='grid gap-1'>
							<p className='text-xs font-medium leading-none'>{order.user.name}</p>
							<p className='text-xs text-muted-foreground'>{order.user.email}</p>
						</div>
						<div className='ml-auto font-medium'>{order.price}</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
};