import { useEffect, useState } from "react"
import { Product } from "../data/types"

export const useProducts = ()=>{
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        const fetchProducts = async()=>{
            try{
                const res = await fetch("http://localhost:8000/products")
            }
        }
    })

}