import React, { useState } from "react";
import { Button, Modal, Form, Input, DatePicker, Select, message } from "antd";

const { Option } = Select;
const { TextArea } = Input;

const BannerLengkapiData = () => {
  const [form] = Form.useForm();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const handleSubmit = () => {
    form.validateFields()
      .then(() => {
        setIsFormVisible(false);
        setIsConfirmationVisible(true);
      })
      .catch(() => message.error('Harap lengkapi semua data yang diperlukan'));
  };

  const handleComplete = () => {
    message.success("Data berhasil disimpan!");
    setIsConfirmationVisible(false);
  };

  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">Lengkapi Data Diri</h3>
          <p className="text-sm">Isi formulir berikut untuk melanjutkan</p>
        </div>
        <Button 
          type="primary" 
          onClick={() => setIsFormVisible(true)}
          size="middle"
        >
          Isi Formulir
        </Button>
      </div>

      <Modal
        title="Formulir Data Diri"
        open={isFormVisible}
        onCancel={() => setIsFormVisible(false)}
        onOk={handleSubmit}
        width={700}
        okText="Simpan"
        cancelText="Batal"
      >
        <Form form={form} layout="vertical" className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="nama" label="Nama Lengkap" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="jenisKelamin" label="Jenis Kelamin" rules={[{ required: true }]}>
              <Select>
                <Option value="L">Laki-laki</Option>
                <Option value="P">Perempuan</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="tempatLahir" label="Tempat Lahir" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="tanggalLahir" label="Tanggal Lahir" rules={[{ required: true }]}>
              <DatePicker className="w-full" />
            </Form.Item>
          </div>

          <Form.Item name="email" label="Email" rules={[{ type: 'email', required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="telepon" label="Nomor Telepon" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="alamat" label="Alamat Lengkap" rules={[{ required: true }]}>
            <TextArea rows={3} />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="kota" label="Kota" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="kodePos" label="Kode Pos">
              <Input />
            </Form.Item>
          </div>
        </Form>
      </Modal>

      <Modal
        title="Data Tersimpan"
        open={isConfirmationVisible}
        onCancel={() => setIsConfirmationVisible(false)}
        onOk={handleComplete}
        width={500}
        okText="Lanjutkan"
        cancelText="Tutup"
      >
        <div className="py-4">
          <p>Data diri Anda telah berhasil disimpan.</p>
          <p className="font-medium mt-2">Silakan lanjutkan ke tahap berikutnya.</p>
        </div>
      </Modal>
    </div>
  );
};

export default BannerLengkapiData;