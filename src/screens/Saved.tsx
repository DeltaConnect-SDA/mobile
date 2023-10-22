import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { ChevronDown, Close } from '@/constants/icons';
import { Colors } from '@/constants/colors';
import { moderateScale, scale } from 'react-native-size-matters';
import { publicAPI } from 'Api/backend';
import { useAuth } from '@/context/AuthProvider';
import { ReportCard } from '@/components';
import { ScrollView } from 'react-native';
import { EmptyState } from './History';

const Complaints = () => {
  const { authState } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Array<any>>([]);

  const handleSaved = async () => {
    try {
      const response = await publicAPI.get(`v1/complaints/saved`, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });
      setIsLoading(false);
      const { data } = response.data;
      console.log(JSON.stringify(data[0]));

      setData(data);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      console.error(JSON.stringify(err.response));
    }
  };

  useEffect(() => {
    handleSaved();
  }, []);

  if (!isLoading) {
    if (data.length === 0) {
      return (
        <>
          <ScrollView style={{ paddingTop: 32, paddingHorizontal: 20, minHeight: '100%' }}>
            <EmptyState
              title="Belum ada Laporan"
              description="Kamu belum memiliki laporan untuk ditampilkan."
            />
          </ScrollView>
        </>
      );
    } else {
      return data.map((complaint) => (
        <ReportCard
          blurHash={complaint.complaint?.ComplaintImages[0].placeholder}
          title={complaint.complaint?.title}
          category={complaint.complaint?.category.title}
          cover={complaint.complaint?.ComplaintImages[0].path}
          id={complaint.complaint?.id}
          place={complaint.complaint?.village}
          status={complaint.complaint?.status.title}
          statusColor={complaint.complaint?.status.color}
          time={complaint.complaint?.createdAt}
          key={complaint.complaint?.id}
        />
      ));
    }
  } else {
    return (
      <>
        <ReportCard
          blurHash="LPEyPa~V-ps.RMxuofW=x[NFRjWB"
          title="Mohon perbaiki saluran air depan SMAN 1 TAMAN"
          category="Loading"
          cover="https://r2.deltaconnect.yukebrillianth.my.id/assets/report/photo/report1.jpg"
          id={1}
          place="Loading"
          status="Loading"
          statusColor={Colors.LINE_STROKE}
          time="loading"
          loading
        />
        <ReportCard
          blurHash="LPEyPa~V-ps.RMxuofW=x[NFRjWB"
          title="Mohon perbaiki saluran air depan SMAN 1 TAMAN"
          category="Loading"
          cover="https://r2.deltaconnect.yukebrillianth.my.id/assets/report/photo/report1.jpg"
          id={1}
          place="Loading"
          status="Loading"
          statusColor={Colors.LINE_STROKE}
          time="loading"
          loading
        />
        <ReportCard
          blurHash="LPEyPa~V-ps.RMxuofW=x[NFRjWB"
          title="Mohon perbaiki saluran air depan SMAN 1 TAMAN"
          category="Loading"
          cover="https://r2.deltaconnect.yukebrillianth.my.id/assets/report/photo/report1.jpg"
          id={1}
          place="Loading"
          status="Loading"
          statusColor={Colors.LINE_STROKE}
          time="loading"
          loading
        />
        <ReportCard
          blurHash="LPEyPa~V-ps.RMxuofW=x[NFRjWB"
          title="Mohon perbaiki saluran air depan SMAN 1 TAMAN"
          category="Loading"
          cover="https://r2.deltaconnect.yukebrillianth.my.id/assets/report/photo/report1.jpg"
          id={1}
          place="Loading"
          status="Loading"
          statusColor={Colors.LINE_STROKE}
          time="loading"
          loading
        />
      </>
    );
  }
};

const Saved = ({ navigation }) => {
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [category, setCategory] = useState('complaints');
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categories, setCategories] = useState([
    { label: 'Laporan Masyarakat', value: 'complaints' },
    { label: 'Usulan Masyarakat', value: 'suggestions' },
    { label: 'Informasi', value: 'post' },
  ]);

  return (
    <View>
      <DropDownPicker
        loading={categoryLoading}
        listMode="SCROLLVIEW"
        ArrowDownIconComponent={({ style }) => <ChevronDown style={style} />}
        placeholder="Pilih Kategori"
        style={{
          borderWidth: 1,
          borderColor: Colors.LINE_STROKE,
          paddingHorizontal: moderateScale(18),
          paddingVertical: moderateScale(15),
          borderRadius: 14,
          marginBottom: 32,
        }}
        dropDownContainerStyle={{
          borderColor: Colors.LIGHT_GRAY,
        }}
        textStyle={{
          color: Colors.TEXT,
          fontFamily: 'Poppins-SemiBold',
          fontSize: scale(11.5),
        }}
        CloseIconComponent={({ style }) => <Close style={style} />}
        open={categoryOpen}
        value={category}
        items={categories}
        setOpen={setCategoryOpen}
        setValue={setCategory}
        setItems={setCategories}
      />
      <View>{category === 'complaints' ? <Complaints /> : null}</View>
    </View>
  );
};

export default Saved;

const styles = StyleSheet.create({});
