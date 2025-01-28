import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import GeneralTable from '@/Components/Tables/GeneralTable';


export default function Home() {
  
    return (
      <div className='py-12'>
        <GeneralTable />
        <div className='py-4'></div>
      </div>
    )
  }
