import React from "react";
import Header from '../../components/header'
import Search from "../../components/advertisers/search";
import {Ctx} from "../../layouts/default";

const SearchPage: React.FC = () => {

    return (
        <>
            <Header Ctx={Ctx} title={"Поиск по блогерам"}/>
            <Search />
        </>
    )
}

export default SearchPage