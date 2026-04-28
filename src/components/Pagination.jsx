export default function Pagination({
    currentPage,
    totalPages,
    setCurrentPage
}) {

    if (totalPages <= 1) return null

    const pages = []

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    return (

        <div className="pagination">

            <button
                className="page-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                ◀
            </button>

            {pages.map(page => (

                <button
                    key={page}
                    className={`page-btn ${page === currentPage ? "active" : ""}`}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </button>

            ))}

            <button
                className="page-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                ▶
            </button>

        </div>
    )
}