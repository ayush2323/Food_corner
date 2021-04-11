import React from 'react'
import { useCostumHooks } from '../../context'

const SearchForm = (props) => {
    const { setSearchTerm } = useCostumHooks()
    const searchValue = React.useRef('')

    React.useEffect(() => {
        searchValue.current.focus()
      }, [])
    
      function searchDish() {
        setSearchTerm(searchValue.current.value)
      }
      function handleSubmit(e) {
        e.preventDefault()
      }
    return (
        <section className='section search'>
            <form className='search-form' onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label htmlFor='name'>search your favorite dish</label>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        ref={searchValue}
                        onChange={searchDish}
                    />
                </div>
            </form>
        </section>
    )
}

export default SearchForm
