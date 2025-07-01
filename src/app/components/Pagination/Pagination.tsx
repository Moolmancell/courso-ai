import { Button } from "../Button/Button"

export function Pagination({currentPage, totalPages, setCurrentPage} : {
    currentPage: number,
    totalPages: number,
    setCurrentPage: (page: number) => void
}) {

    return (
        <div data-testid="pagination">
            <Button disabled={1 >= currentPage} onClick={() => setCurrentPage(currentPage - 1)}>Previous</Button>
            <div>
                {
                    currentPage > 2 && (
                        <Button className="disabled" disabled={true} data-testid="... left">...</Button>
                    )
                }
                {
                    currentPage === 1 ? (
                        <div>
                            <Button className="disabled" disabled={true}>{currentPage}</Button>
                            {currentPage + 1 <= totalPages && <Button onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</Button>}
                            {currentPage + 2 <= totalPages && <Button onClick={() => setCurrentPage(currentPage + 2)}>{currentPage + 2}</Button>}
                        </div> 
                    ) : currentPage === totalPages ? (
                        <div>
                            {currentPage - 2 <= totalPages && <Button onClick={() => setCurrentPage(currentPage - 2)}>{currentPage - 2}</Button>}
                            {currentPage - 1 <= totalPages && <Button onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</Button>}
                            <Button className="disabled" disabled={true}>{currentPage}</Button>
                        </div>
                    ) : (
                        <div>
                            {currentPage - 1 <= totalPages && <Button onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</Button>}
                            <Button className="disabled" disabled={true}>{currentPage}</Button>
                            {currentPage + 1 <= totalPages && <Button onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</Button>}
                        </div>
                    )
                }
                {
                    currentPage < totalPages - 1 && (
                        <Button className="disabled" data-testid="... right" disabled={true}>...</Button>
                    )
                }
            </div>
            <Button disabled={totalPages <= currentPage} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
        </div>

    )
}