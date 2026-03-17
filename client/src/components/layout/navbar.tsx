const navbar = () => {
  return (
    <nav className="fixed bottom-4 w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4 ">
        <div className="flex flex-nowrap items-center gap-4">
            <div>Dashboard</div>
            <div>Products</div>
            <div>Requested</div>
            <div>Map</div>
        </div>
    </nav>
  )
}

export default navbar
