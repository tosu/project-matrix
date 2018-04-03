class CreateMatrices < ActiveRecord::Migration[5.1]
  def change
    create_table :matrices do |t|
      t.string :md5
      t.float :value
      t.timestamps
    end
    
    add_index :matrices, [:md5], unique: true
  end
end
