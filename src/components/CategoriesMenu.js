// src/components/CategoriesMenu.js
import Link from 'next/link';
import styles from './CategoriesMenu.module.css';
import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';

async function getCategories() {
    try {
        const productsRef = collection(db, "products");
        const querySnapshot = await getDocs(productsRef);
        const allCategoryValues = querySnapshot.docs.map(doc => doc.data().category);
        const validCategories = allCategoryValues.filter(Boolean);
        const categories = new Set(validCategories);
        return ["Todos", ...categories];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return ["Todos"];
    }
}

export default async function CategoriesMenu() {
    const categories = await getCategories();
    return (
        <aside className={styles.container}>
            <p className={styles.title}>Categorías</p>
            <ul className={styles.list}>
                {categories.map(category => (
                    <li key={category}> 
                        <Link 
                            href={category === "Todos" ? "/catalog" : `/catalog/${category}`} 
                            className={styles.link}
                        >
                            {category}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}