import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { IMAGE_BASE_URL } from "../../utils/constants";
import Footer from "../../components/Footer";

const AuthScreen = () => {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	const handleFormSubmit = (e) => {
		e.preventDefault();
		navigate(`/signup?email=${email}`);
	};

	const [trending, setTrending] = useState([]);
	useEffect(() => {
		const getTrending = async () => {
			try {
				const res = await axios.get("/api/v1/trending/");
				setTrending(res.data);
			} catch (error) {
				if(error.message.includes(404)) {
					toast.error("Content not found");
				} else {
					toast.error("Internal server error");
				}
			}
		}

		getTrending();
	}, []);

	const sliderRef = useRef(null);
	const scrollLeft = () => {
		if (sliderRef.current) sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
	};

	const scrollRight = () => {
		if (sliderRef.current) sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
	};
	return (
		<div className='hero-bg relative'>
			{/* Navbar */}
			<header className='max-w-7xl mx-auto flex items-center justify-between p-4 pb-10'>
				<img src='/netflix-logo.png' alt='Netflix Logo' className='w-32 md:w-52' />
				<Link to={"/login"} className='text-white bg-red-600 py-1 px-4 rounded'>
					Sign In
				</Link>
			</header>

			{/* hero section */}
			<div className='flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto'>
				<h1 className='text-4xl md:text-6xl font-bold mb-4 max-w-lg'>Unlimited movies, TV shows, and more</h1>
				<p className='text-xl mb-4 font-medium'>Starts at ₱169. Cancel anytime.</p>
				<p className='mb-4 text-xl'>Ready to watch? Enter your email to create or restart your membership.</p>

				<form className='flex flex-col md:flex-row gap-4 w-1/2' onSubmit={handleFormSubmit}>
					<input
						type='email'
						placeholder='Email address'
						className='p-2 rounded flex-1 bg-black/80 border border-gray-700'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button className='bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center'>
						Get Started
						<ChevronRight className='size-8 md:size-10' />
					</button>
				</form>
			</div>

			{/* separator */}
			<div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

			{/* 1st section */}
			<div className='py-10 bg-black text-white'>
				{trending?.length > 0 && (
						<div className='mt-12 mx-8 xl:mx-40 relative'>
							<h3 className='text-2xl mb-4'>Trending Now</h3>
							<div className='flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group' ref={sliderRef}>
								{trending.map((content, index) => {
									if (content.poster_path === null) return null;
									return (
										<Link 
											key={content.id} 
											to={`/watch/${content.id}`} 
											className='w-52 flex-none relative h-56'
										>
											<img
												src={IMAGE_BASE_URL(content.backdrop_path)}
												alt='Poster path'
												className='object-cover w-44 h-56 rounded-md mx-auto'
											/>
											<div className="-translate-y-28 translate-x-1 text-[80px] font-bold">{index + 1}</div>	
											{/* <h4 className='text-lg font-semibold'>{content.title || content.name}</h4> */}
										</Link>
									);
								})}
								<ChevronRight
									className='absolute top-1/2 -translate-y-1/2 right-8 lg:right-2 -mr-12 w-6 h-28
											opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
											 bg-slate-700 hover:bg-slate-600 text-white rounded-md'
									onClick={scrollRight}
								/>
								<ChevronLeft
									className='absolute top-1/2 -translate-y-1/2 left-8 lg:left-2 -ml-12 w-6 h-28 opacity-0
									group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-slate-700 hover:bg-slate-600
									text-white rounded-md'
									onClick={scrollLeft}
								/>
							</div>
						</div>
					)}
			</div>

			{/* 2nd section */}
			<div className='py-10 bg-black text-white'>
				<div className="join join-vertical mx-8 xl:mx-40 space-y-2">
					<h2 className="text-2xl py-4">Frequently Asked Questions</h2>
					<div className="collapse collapse-arrow join-item border-base-300 border bg-base-100">
						<input type="radio" name="my-accordion-4" className="hover:bg-base-300"/>
						<div className="collapse-title font-semibold text-2xl border-b border-black">What is Netflix?</div>
						<div className="collapse-content text-2xl">
							Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.
							<br></br><br></br>
							You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!
						</div>
					</div>
					<div className="collapse collapse-arrow join-item border-base-300 border bg-base-100">
						<input type="radio" name="my-accordion-4"/>
						<div className="collapse-title font-semibold text-2xl border-b border-black">How much does Netflix cost?</div>
						<div className="collapse-content text-2xl">
							Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₱169 to ₱619 a month. No extra costs, no contracts.
						</div>
					</div>
					<div className="collapse collapse-arrow join-item border-base-300 border bg-base-100">
						<input type="radio" name="my-accordion-4" />
						<div className="collapse-title font-semibold text-2xl border-b border-black">Where can I watch?</div>
						<div className="collapse-content text-2xl">
							Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.
							<br></br><br></br>
							You can also download your favorite shows with the iOS or Android app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.
						</div>
					</div>
				</div>
			</div>

			<div className='flex flex-col items-center justify-center py-10 bg-black text-white'>
				<p className="py-4">Ready to watch? Enter your email to create or restart your membership.</p>
				<form className='flex flex-col justify-center md:flex-row gap-4 w-1/2' onSubmit={handleFormSubmit}>
					<input
						type='email'
						placeholder='Email address'
						className='p-2 rounded flex-1 bg-black/80 border border-gray-700 max-w-lg'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button className='bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center'>
						Get Started
						<ChevronRight className='size-8 md:size-10' />
					</button>
				</form>
			</div>

			{/* 3rd section */}
			<div className='py-10 bg-black text-white'>
				<div className='flex max-w-7xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2'>
					{/* left side */}
					<div className='flex-1 text-center md:text-left'>
						<h2 className='text-4xl md:text-5xl font-extrabold mb-4'>Watch everywhere</h2>
						<p className='text-lg md:text-xl'>
							Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.
						</p>
					</div>

					{/* right side */}
					<div className='flex-1 relative overflow-hidden'>
						<img src='/device-pile.png' alt='Device image' className='mt-4 z-20 relative'/>
						<video
							className='absolute top-2 left-1/2 -translate-x-1/2  h-4/6 z-10 max-w-[63%]'
							playsInline
							autoPlay={true}
							muted
							loop
						>
							<source src='/video-devices.m4v' type='video/mp4' />
						</video>
					</div>
				</div>
			</div>

			<Footer/>
		</div>
	);
};
export default AuthScreen;