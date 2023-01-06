import axios from 'axios';
const { API_URL } = require('./url.json');

export type Tag = "CORE" | "TREASURY" | "URGENT" | "XDC_COMMUNITY"

export type Option = "YES" | "NO" | "ABSTAIN"

export type Proposal = {
    title: string
    proposal: number
    tags: string[]
    description: string
    contract: string
    creator: string
    created: string
    opens: string
    closes: string
    toll: number
    urls: string[]
    files: string[]
    options: Option[]
    burnPercentage: number
    burnAddress: string
    communityPercentage: number
    communityAddress: string
    uniqueHash: string
}

export const createProposal = async (proposal: Proposal) => {
    const config = {
        method: 'post',
        url: `${API_URL}/proposal`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(proposal),
    }

    try {
        const response = await axios(config)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const getAllProposals = async () => {
    const config = {
        method: 'get',
        url: `${API_URL}/proposal/all`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }

    try {
        const response = await axios(config)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const getProposal = async (id: number) => {
    const config = {
        method: 'get',
        url: `${API_URL}/proposal/id/${id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }

    try {
        const response = await axios(config)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const fullTextSearch = async (query: string) => {
    const config = {
        method: 'get',
        url: `${API_URL}/proposal/search/${query}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }

    try {
        const response = await axios(config)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const getProposalsByTag = async (tag: string) => {

    const config = {
        method: 'get',
        url: `${API_URL}/proposal/tags/${tag}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }

    try {
        const response = await axios(config)
        return response
    } catch (error) {
        console.log(error)
    }
}


