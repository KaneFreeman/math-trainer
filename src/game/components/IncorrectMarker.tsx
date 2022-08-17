import ClearIcon from '@mui/icons-material/Clear';

interface IncorrectMarkerProps {
  incorrect: boolean;
}

const IncorrectMarker = ({ incorrect }: IncorrectMarkerProps) => {
  return <ClearIcon color={incorrect ? 'error' : 'disabled'} fontSize="large" sx={{ opacity: incorrect ? 1 : 0.25 }} />;
};

export default IncorrectMarker;
