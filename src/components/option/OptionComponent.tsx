import {useEffect, useState} from "react";
import * as React from "react";
import {Product} from "../../entity/product.ts";

export const OptionComponent = () => {

    const [enableDropdown, setEnableDropdown] = useState(false);
    const [option, setOption] = useState("0")
    const [products, setProducts] = useState<Product[]>();
    const [product, setProduct] = useState(new Product(0, "", 0, "", "", "", {rate: 0, count: 0}));
    const categories: Array<string> = ["electronics", "jewelery", "men's clothing", "women's clothing"];

    useEffect(() => {
        // Runs only on the first render
        fetch("https://fakestoreapi.com/products?limit=5").then(async response => {
            setProducts(await response.json());
        });
    }, [])

    const handleDropdownToggle = () => {
        setEnableDropdown(!enableDropdown);
    }

    const handleOption = (event: React.MouseEvent<HTMLButtonElement>) => {
        switch (event.currentTarget.name) {
            case "1":
                setEnableDropdown(!enableDropdown);
                setOption("1");
                break;
            case "2":
                setEnableDropdown(!enableDropdown);

                setOption("2");
                break;
            case "3":
                setOption("3");
                break;
            default:
                break;
        }
    }

    const handleOptionForEditProduct = (id: number) => {
        setOption("3")
        products?.map((product: Product) => {
            if (product.id === id) {
                setProduct(product)
            }
        })

    }

    const handleRemoveProduct = (id: number) => {
        fetch(`https://fakestoreapi.com/products/${id}`, {method: "DELETE"}).then(async response => {
            if (response.status === 200) {
                setProducts(products?.filter((product: Product) => product.id !== id));
            }
        })
    }

    const handleEditProduct = () => {
         console.log(product.category)
        fetch(`https://fakestoreapi.com/products/${product.id}`, {
            method: "PUT",
            body: JSON.stringify(product)
        }).then(async response => {
            if (response.status === 200) {
                products?.filter((productLoop: Product) => {
                    if (product.id === productLoop.id) {
                        productLoop.title = product.title;
                        productLoop.description = product.description;
                        productLoop.price = product.price;
                        productLoop.category = product.category;
                    }
                })
                setOption("1")
                setProduct({
                    image: "",
                    id: 0,
                    title : "",
                    description : "",
                    price : 0,
                    category :"" ,
                    rating : {
                        count : 0,
                        rate : 0,
                    }
                })
            }
        })
    }

    const handleAddProduct = () => {
        console.log(product)
        product.image= "https://www.svgrepo.com/show/406080/letter-t.svg"
        fetch(`https://fakestoreapi.com/products`, {
            method: "POST",
            body: JSON.stringify(product)
        }).then(async response => {
            if (response.status === 200) {
                products?.push(product);
                setOption("1")
            }
        })
    }

    const dropdownElement = () => {
        return <div id="dropdownAvatarName"
                    className="bg-white absolute  mt-1 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
            <ul className="py-2 block text-sm text-gray-700 dark:text-gray-200 "
                aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                <li>
                    <button
                        onClick={handleOption}
                        type="button"
                        name={"1"}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        style={{width: "100%"}}>Table
                    </button>
                </li>
                <li>
                    <button
                        onClick={handleOption}
                        type="button"
                        name={"2"}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        style={{width: "100%"}}>Create Product
                    </button>
                </li>
            </ul>
        </div>
    }

    const productsTable = () => {

        const loopProducts = products?.map((product: Product) => <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={product.id}>
                <td className="px-6 py-4 " style={{width: "fit-content"}}>
                    {product.id}
                </td>
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <img className="w-10 h-10 rounded-full" src={product.image}
                         alt="Jese image"/>
                    <div className="ps-3">
                        <div className="text-base font-semibold">
                            {product.title}
                        </div>
                        <div className="font-normal text-gray-500">
                            {product.description.substring(0, 90)}
                        </div>
                    </div>
                </th>
                <td className="px-6 py-4">
                    ${product.price}
                </td>
                <td className="px-6 py-4">
                    {product.category}
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center mt-2.5 mb-5">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <svg className="w-4 h-4 text-yellow-300" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path
                                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                        </div>
                        <span
                            className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                            {product.rating.rate}
                        </span>
                    </div>
                </td>
                <td className="px-6 py-4 text-right">


                    <div className="inline-flex rounded-md shadow-sm" role="group">
                        <button type="button"
                                onClick={() => handleOptionForEditProduct(product.id)}
                                name={"3"}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                 viewBox="0 0 24 24">
                                <path fillRule="evenodd"
                                      d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                                      clipRule="evenodd"/>
                                <path fillRule="evenodd"
                                      d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                                      clipRule="evenodd"/>
                            </svg>
                            Edit
                        </button>
                        <button type="button"
                                onClick={() => handleRemoveProduct(product.id)}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                 viewBox="0 0 24 24">
                                <path fillRule="evenodd"
                                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                                      clipRule="evenodd"/>
                            </svg>
                            Remove
                        </button>
                    </div>

                </td>
            </tr>
        )


        return <div className="overflow-x-auto shadow-md sm:rounded-lg mt-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3" style={{width: "fit-content"}}>
                        ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Product Info
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Rating
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
                </thead>
                <tbody>
                {loopProducts}
                </tbody>
            </table>
        </div>

    }

    const formEditProduct = () => {
        return <div
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-4 "
            style={{width: "500px"}}>

            <div className="flex flex-col items-center pb-10 px-4 pt-4">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg"
                     src={product.image}
                     alt="Bonnie image"/>
                <form className="max-w-sm mx-auto" style={{width: "300px"}}>
                    <input type="text"
                           className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           onChange={(event) => setProduct({...product, title: event.target.value})}
                           value={product.title}
                    />
                    <input type="text"
                           className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           onChange={(event) => setProduct({...product, description: event.target.value})}
                           value={product.description}
                    />

                    <input type="number"
                           className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           onChange={(event) => setProduct({...product, price: Number(event.currentTarget.value)})}
                           value={product.price}
                    />


                    <label htmlFor="countries"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                    <select id="countries"
                            onClick={(event) => setProduct({...product , category : event.currentTarget.value})}
                            defaultValue={product.category} /* set default value now it will map select={} attribute auto */
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {categories.map(category => (
                            <option key={category}>{category}</option>
                        ))}
                    </select>
                    <div className="flex mt-4 md:mt-6">
                        <button type="button"
                                onClick={handleEditProduct}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">update
                        </button>
                    </div>
                </form>


            </div>
        </div>

    }

    const formAddProduct = () => {
        return <div
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-4 "
            style={{width: "500px"}}>

            <div className="flex flex-col items-center pb-10 px-4 pt-4">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg"
                     src="https://www.svgrepo.com/show/406080/letter-t.svg"
                     alt="Bonnie image"/>
                <form className="max-w-sm mx-auto" style={{width: "300px"}}>
                    <input type="text"
                           className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           onChange={(event) => setProduct({...product, title: event.target.value})}
                           value={product.title}
                    />
                    <input type="text"
                           className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           onChange={(event) => setProduct({...product, description: event.target.value})}
                           value={product.description}
                    />

                    <input type="number"
                           className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           onChange={(event) => setProduct({...product, price: Number(event.currentTarget.value)})}
                           value={product.price}
                    />

                    <label htmlFor="countries"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                    <select id="countries"
                            onClick={(event) => setProduct({...product , category : event.currentTarget.value})}
                            defaultValue={product.category} /* set default value now it will map select={} attribute auto */
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {categories.map(category => (
                            <option key={category}>{category}</option>
                        ))}
                    </select>
                    <div className="flex mt-4 md:mt-6">
                        <button type="button"
                                onClick={handleAddProduct}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">create
                        </button>
                    </div>
                </form>


            </div>
        </div>

    }

    /*
        let dropdown: JSX.Element | null
        if (enableDropdown) {
            dropdown = dropdownElement()
        } else {
            dropdown = null
        }
    */

    let content: JSX.Element | null


    switch (option) {
        case "1":
            content = productsTable();
            break;
        case "2":
            content = formAddProduct();
            break;
        case "3":
            content = formEditProduct();
            break;
        default:
            content = null
            break;
    }

    return (
        <>
            <div style={{margin: "0 auto", maxWidth: "fit-content"}}>
                <button id="dropdownAvatarNameButton"
                        onClick={handleDropdownToggle}
                        data-dropdown-toggle="dropdownAvatarName"
                        className="p-2  dark:bg-gray-700 dark:divide-gray-600 flex items-center text-sm pe-1 font-medium text-gray-900 rounded-lg  hover:text-blue-600 dark:hover:text-blue-500 md:me-0  focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
                        type="button">
                    <span className="sr-only">Open user menu</span>
                    <img className="w-8 h-8 me-2 rounded-full" src="https://www.svgrepo.com/show/406080/letter-t.svg"
                         alt="user photo"/>
                    Choose some
                    <svg className="w-2.5 h-2.5 ms-3 mr-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="m1 1 4 4 4-4"/>
                    </svg>
                </button>
                {enableDropdown ? dropdownElement() : null}
                {/*{dropdown}*/}
            </div>

            <div style={{margin: "0 auto", maxWidth: "fit-content"}}>
                {content}
            </div>
        </>
    )
}