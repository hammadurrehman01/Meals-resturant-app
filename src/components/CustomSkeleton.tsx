import { Skeleton } from '@mui/material'

const CustomSkeleton = () => {
    return (
        <>
            <div className='mt-6 px-8 flex items-center justify-between'>
                <Skeleton variant="rectangular" width={280} height={300} />
                <Skeleton variant="rectangular" width={280} height={300} />
                <Skeleton variant="rectangular" width={280} height={300} />
                <Skeleton variant="rectangular" width={280} height={300} />
            </div>
            <div className='mt-6 px-8 flex items-center justify-between'>
                <Skeleton variant="rectangular" width={280} height={300} />
                <Skeleton variant="rectangular" width={280} height={300} />
                <Skeleton variant="rectangular" width={280} height={300} />
                <Skeleton variant="rectangular" width={280} height={300} />
            </div>

        </>
    )
}

export default CustomSkeleton